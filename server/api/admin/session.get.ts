import type { AdminSession } from "#shared/types/admin";
import { getStudioUser } from "../../utils/studio-auth";

export default defineEventHandler(async (event): Promise<AdminSession> => {
  setResponseHeader(event, "cache-control", "no-store");

  const user = await getStudioUser(event);

  return {
    authenticated: Boolean(user),
    user: user ? { name: user.name, email: user.email } : null,
  };
});
