import { createError } from "h3";
import type { AdminContactLocation } from "#shared/types/admin";
import type { ContactLocation } from "#shared/types/contacts";

export const CONTACTS_PLACE_KEY = "contacts:place";
export const CONTACTS_COUNTRY_KEY = "contacts:country";
export const CONTACTS_TIMEZONE_KEY = "contacts:timezone";

export const CONTACT_LOCATION_MAX_LENGTH = 80;

/** Reads the raw location values from KV without enforcing that they exist. */
export async function readContactLocation(): Promise<AdminContactLocation> {
  const storage = useStorage("kv");

  const [place, country, timezone] = await Promise.all([
    storage.getItem<string>(CONTACTS_PLACE_KEY),
    storage.getItem<string>(CONTACTS_COUNTRY_KEY),
    storage.getItem<string>(CONTACTS_TIMEZONE_KEY),
  ]);

  return {
    place: place || null,
    country: country || null,
    timezone: timezone || null,
  };
}

/** Writes the three KV keys that `/contacts` reads. */
export async function writeContactLocation(location: ContactLocation): Promise<void> {
  const storage = useStorage("kv");

  await Promise.all([
    storage.setItem(CONTACTS_PLACE_KEY, location.place),
    storage.setItem(CONTACTS_COUNTRY_KEY, location.country),
    storage.setItem(CONTACTS_TIMEZONE_KEY, location.timezone),
  ]);
}

export function isValidTimezone(timezone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-GB", { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
}

function parseLocationText(value: unknown, label: string): string {
  if (typeof value !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: `${label} is required`,
    });
  }

  const trimmed = value.trim();

  if (!trimmed) {
    throw createError({
      statusCode: 400,
      statusMessage: `${label} must not be empty`,
    });
  }

  if (trimmed.length > CONTACT_LOCATION_MAX_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `${label} must be ${CONTACT_LOCATION_MAX_LENGTH} characters or fewer`,
    });
  }

  return trimmed;
}

/** Validates and normalizes an admin payload into a storable location. */
export function normalizeContactLocation(input: unknown): ContactLocation {
  const body =
    typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};

  const place = parseLocationText(body.place, "Place");
  const country = parseLocationText(body.country, "Country");
  const timezone = parseLocationText(body.timezone, "Timezone");

  if (!isValidTimezone(timezone)) {
    throw createError({
      statusCode: 400,
      statusMessage: `"${timezone}" is not a valid IANA timezone (for example "Europe/Bratislava")`,
    });
  }

  return { place, country, timezone };
}
