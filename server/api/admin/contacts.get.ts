import type { AdminContactLocation } from "#shared/types/admin";
import { readContactLocation } from "../../utils/contacts-location";
import { requireStudioUser } from "../../utils/studio-auth";

export default defineEventHandler(async (event): Promise<AdminContactLocation> => {
  setResponseHeader(event, "cache-control", "no-store");

  await requireStudioUser(event);

  return readContactLocation();
});
