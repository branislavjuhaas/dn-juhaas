import type { H3Event } from "h3";
import type { AdminLocationResult } from "#shared/types/admin";
import { isValidTimezone } from "../../utils/contacts-location";
import { requireStudioUser } from "../../utils/studio-auth";

interface CloudflareGeo {
  city?: string;
  country?: string;
  countryName?: string;
  timezone?: string;
}

interface ReverseGeocodeResponse {
  city?: unknown;
  locality?: unknown;
  principalSubdivision?: unknown;
  countryName?: unknown;
}

const REVERSE_GEOCODE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const GEOCODE_TIMEOUT_MS = 5000;

function readString(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];

  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function firstString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

/** Geo data is provided by Cloudflare (wrangler proxy in dev, the platform in prod). */
function readCloudflareGeo(event: H3Event): CloudflareGeo | null {
  const context = event.context as {
    cf?: unknown;
    cloudflare?: { request?: { cf?: unknown } };
  };

  const candidate = context.cf ?? context.cloudflare?.request?.cf;

  if (typeof candidate !== "object" || candidate === null) {
    return null;
  }

  const record = candidate as Record<string, unknown>;

  return {
    city: readString(record, "city"),
    country: readString(record, "country"),
    countryName: readString(record, "countryName"),
    timezone: readString(record, "timezone"),
  };
}

function parseCoordinate(
  value: unknown,
  label: "latitude" | "longitude",
  min: number,
  max: number,
): number | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const parsed =
    typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;

  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid ${label}: expected a number between ${min} and ${max}`,
    });
  }

  return parsed;
}

async function reverseGeocode(
  latitude: number,
  longitude: number,
): Promise<{ place?: string; country?: string }> {
  try {
    const url = new URL(REVERSE_GEOCODE_URL);
    url.searchParams.set("latitude", String(latitude));
    url.searchParams.set("longitude", String(longitude));
    url.searchParams.set("localityLanguage", "en");

    const response = await fetch(url, { signal: AbortSignal.timeout(GEOCODE_TIMEOUT_MS) });

    if (!response.ok) {
      return {};
    }

    const data = (await response.json()) as ReverseGeocodeResponse;

    return {
      place: firstString(data.city, data.locality, data.principalSubdivision),
      country: firstString(data.countryName),
    };
  } catch {
    // Geocoding is best effort: the UI lets the user fill in the values manually.
    return {};
  }
}

export default defineEventHandler(async (event): Promise<AdminLocationResult> => {
  setResponseHeader(event, "cache-control", "no-store");

  await requireStudioUser(event);

  const body = await readBody<unknown>(event);
  const input = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {};

  const latitude = parseCoordinate(input.latitude, "latitude", -90, 90);
  const longitude = parseCoordinate(input.longitude, "longitude", -180, 180);

  if ((latitude === undefined) !== (longitude === undefined)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Latitude and longitude must be provided together",
    });
  }

  const geo = readCloudflareGeo(event);

  let place = geo?.city;
  let country = geo?.countryName ?? geo?.country;

  if ((!place || !country) && latitude !== undefined && longitude !== undefined) {
    const geocoded = await reverseGeocode(latitude, longitude);

    place ||= geocoded.place;
    country ||= geocoded.country;
  }

  const bodyTimezone = typeof input.timezone === "string" ? input.timezone.trim() : "";
  const timezoneCandidate = bodyTimezone || geo?.timezone || "";
  const timezone =
    timezoneCandidate && isValidTimezone(timezoneCandidate) ? timezoneCandidate : undefined;

  const result: AdminLocationResult = {};

  if (place) result.place = place;
  if (country) result.country = country;
  if (timezone) result.timezone = timezone;

  return result;
});
