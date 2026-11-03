import type { ContactLocation } from "#shared/types/contacts";

const PLACE_KEY = "contacts:place";
const TIMEZONE_KEY = "contacts:timezone";

function formatLocalTime(timezone: string, date: Date) {
  let parts: Intl.DateTimeFormatPart[];

  try {
    parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone,
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
      timeZoneName: "short",
    }).formatToParts(date);
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: `Invalid timezone "${timezone}" configured in the KV storage`,
    });
  }

  const time = parts
    .filter((part) => part.type === "hour" || part.type === "minute")
    .map((part) => part.value)
    .join(":");

  return {
    time,
    timezoneAbbreviation: parts.find((part) => part.type === "timeZoneName")?.value ?? timezone,
  };
}

export default defineEventHandler(async (event): Promise<ContactLocation> => {
  const storage = useStorage("kv");

  const [place, timezone] = await Promise.all([
    storage.getItem<string>(PLACE_KEY),
    storage.getItem<string>(TIMEZONE_KEY),
  ]);

  if (!place || !timezone) {
    throw createError({
      statusCode: 500,
      statusMessage: `Contacts location is not configured in the KV storage (${PLACE_KEY}, ${TIMEZONE_KEY})`,
    });
  }

  // Local time has to be current, so this response must never be cached.
  setResponseHeader(event, "cache-control", "no-store");

  return {
    place,
    timezone,
    ...formatLocalTime(timezone, new Date()),
  };
});
