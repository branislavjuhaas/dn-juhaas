import { createError, getRequestProtocol, useSession } from "h3";
import type { H3Event } from "h3";
import { useRuntimeConfig } from "#imports";

/** Only the slice of the Studio runtime config that is needed here. */
interface StudioAuthRuntimeConfig {
  adminDevBypass?: boolean;
  studio?: {
    auth?: {
      sessionSecret?: string;
    };
  };
}

export interface StudioUser {
  name: string;
  email: string;
}

const DEV_USER: StudioUser = {
  name: "Development",
  email: "dev@localhost",
};

function toStudioUser(data: unknown): StudioUser | null {
  if (typeof data !== "object" || data === null) {
    return null;
  }

  const user = (data as { user?: unknown }).user;

  if (typeof user !== "object" || user === null) {
    return null;
  }

  const { name, email } = user as { name?: unknown; email?: unknown };

  if (typeof name !== "string" || !name || typeof email !== "string" || !email) {
    return null;
  }

  return { name, email };
}

/**
 * Reads the current Nuxt Studio user from the encrypted `studio-session` cookie.
 *
 * The admin page must never render the dashboard for an unauthenticated
 * visitor, development included. Studio bypasses authentication locally, so a
 * local identity is only used when `ADMIN_DEV_BYPASS=1` is set explicitly.
 */
export async function getStudioUser(event: H3Event): Promise<StudioUser | null> {
  const config = useRuntimeConfig(event) as unknown as StudioAuthRuntimeConfig;

  if (import.meta.dev) {
    return config.adminDevBypass ? DEV_USER : null;
  }

  const password = config.studio?.auth?.sessionSecret;

  if (!password) {
    return null;
  }

  try {
    const session = await useSession(event, {
      name: "studio-session",
      password,
      cookie: {
        path: "/",
        secure: getRequestProtocol(event) === "https",
      },
    });

    return toStudioUser(session.data);
  } catch {
    // A malformed or tampered cookie must be treated as unauthenticated, not a 500.
    return null;
  }
}

/** Throws a 401 unless the request carries a valid Nuxt Studio session. */
export async function requireStudioUser(event: H3Event): Promise<StudioUser> {
  const user = await getStudioUser(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage:
        "Authentication required. Sign in to Nuxt Studio to manage the contact location.",
    });
  }

  return user;
}
