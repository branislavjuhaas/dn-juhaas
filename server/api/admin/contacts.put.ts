import type { ContactLocation } from "#shared/types/contacts";
import { normalizeContactLocation, writeContactLocation } from "../../utils/contacts-location";
import { requireStudioUser } from "../../utils/studio-auth";

export default defineEventHandler(async (event): Promise<ContactLocation> => {
  setResponseHeader(event, "cache-control", "no-store");

  await requireStudioUser(event);

  const body = await readBody<unknown>(event);
  const location = normalizeContactLocation(body);

  await writeContactLocation(location);

  return location;
});
