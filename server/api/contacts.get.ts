import type { ContactLocation } from "#shared/types/contacts";

const PLACE_KEY = "contacts:place";
const COUNTRY_KEY = "contacts:country";
const TIMEZONE_KEY = "contacts:timezone";

export default defineEventHandler(async (event): Promise<ContactLocation> => {
  const storage = useStorage("kv");

  const [place, country, timezone] = await Promise.all([
    storage.getItem<string>(PLACE_KEY),
    storage.getItem<string>(COUNTRY_KEY),
    storage.getItem<string>(TIMEZONE_KEY),
  ]);

  if (!place || !country || !timezone) {
    throw createError({
      statusCode: 500,
      statusMessage: `Contacts location is not configured in the KV storage (${PLACE_KEY}, ${COUNTRY_KEY}, ${TIMEZONE_KEY})`,
    });
  }

  try {
    new Intl.DateTimeFormat("en-GB", { timeZone: timezone });
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: `Invalid timezone "${timezone}" configured in the KV storage`,
    });
  }

  // KV values can change at any time, so this response must never be cached.
  setResponseHeader(event, "cache-control", "no-store");

  return { place, country, timezone };
});
