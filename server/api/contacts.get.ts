import type { ContactLocation } from "#shared/types/contacts";
import {
  CONTACTS_COUNTRY_KEY,
  CONTACTS_PLACE_KEY,
  CONTACTS_TIMEZONE_KEY,
  isValidTimezone,
  readContactLocation,
} from "../utils/contacts-location";

export default defineEventHandler(async (event): Promise<ContactLocation> => {
  const { place, country, timezone } = await readContactLocation();

  if (!place || !country || !timezone) {
    throw createError({
      statusCode: 500,
      statusMessage: `Contacts location is not configured in the KV storage (${CONTACTS_PLACE_KEY}, ${CONTACTS_COUNTRY_KEY}, ${CONTACTS_TIMEZONE_KEY})`,
    });
  }

  if (!isValidTimezone(timezone)) {
    throw createError({
      statusCode: 500,
      statusMessage: `Invalid timezone "${timezone}" configured in the KV storage`,
    });
  }

  // KV values can change at any time, so this response must never be cached.
  setResponseHeader(event, "cache-control", "no-store");

  return { place, country, timezone };
});
