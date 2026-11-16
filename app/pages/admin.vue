<script setup lang="ts">
import type {
  AdminContactLocation,
  AdminLocationResult,
  AdminSession,
  ContactLocationDraft,
} from "#shared/types/admin";
import type { ContactLocation } from "#shared/types/contacts";

interface StudioRouteRuntimeConfig {
  public?: {
    studio?: {
      route?: string;
    };
  };
}

const STUDIO_FALLBACK_ROUTE = "/_studio";

const COMMON_TIMEZONES = [
  "Europe/Bratislava",
  "Europe/Prague",
  "Europe/Berlin",
  "Europe/London",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "Asia/Tokyo",
  "Australia/Sydney",
  "UTC",
];

const studioRoute =
  (useRuntimeConfig() as unknown as StudioRouteRuntimeConfig).public?.studio?.route ||
  STUDIO_FALLBACK_ROUTE;

// Nuxt Studio owns the GitHub OAuth admin login and stores the redirect target
// in a `studio-redirect` cookie before sending the user to GitHub.
const studioLoginRoute = `${studioRoute}?redirect=${encodeURIComponent("/admin")}`;

useSeoMeta({
  title: "Admin",
  robots: "noindex, nofollow",
});

const {
  data: session,
  error: sessionError,
  status: sessionStatus,
  refresh: refreshSession,
} = await useFetch<AdminSession>("/api/admin/session", { key: "admin-session" });

const isCheckingSession = computed(
  () => sessionStatus.value === "idle" || sessionStatus.value === "pending",
);
const isAuthenticated = computed(() => session.value?.authenticated === true);

const { data: savedLocation, error: savedLocationError } = await useFetch<AdminContactLocation>(
  "/api/admin/contacts",
  {
    key: "admin-contacts",
    immediate: isAuthenticated.value,
  },
);

const form = reactive<ContactLocationDraft>({
  place: "",
  country: "",
  timezone: "",
});

watch(
  savedLocation,
  (location) => {
    if (!location) return;

    form.place = location.place ?? "";
    form.country = location.country ?? "";
    form.timezone = location.timezone ?? "";
  },
  { immediate: true },
);

const toast = useToast();

function getErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === "object" && error !== null) {
    const record = error as {
      statusMessage?: unknown;
      message?: unknown;
      data?: { statusMessage?: unknown; message?: unknown };
    };
    const message =
      record.data?.statusMessage ?? record.data?.message ?? record.statusMessage ?? record.message;

    if (typeof message === "string" && message) {
      return message;
    }
  }

  return fallback;
}

const saving = ref(false);
const saveError = ref<string | null>(null);

async function save() {
  if (saving.value) return;

  saving.value = true;
  saveError.value = null;

  try {
    const saved = await $fetch<ContactLocation>("/api/admin/contacts", {
      method: "PUT",
      body: { ...form },
    });

    form.place = saved.place;
    form.country = saved.country;
    form.timezone = saved.timezone;

    toast.add({
      title: "Location saved",
      description: "The contacts page now shows the updated location.",
      color: "success",
      icon: "i-ph-check-circle",
    });
  } catch (error) {
    saveError.value = getErrorMessage(
      error,
      "The location could not be saved. Please check the values and try again.",
    );
  } finally {
    saving.value = false;
  }
}

const locating = ref(false);
const locationError = ref<string | null>(null);
const locationMessage = ref<string | null>(null);

function useMyLocation() {
  locationError.value = null;
  locationMessage.value = null;

  if (!import.meta.client) return;

  if (!("geolocation" in navigator)) {
    locationError.value =
      "Geolocation is not available in this browser. Please enter the location manually.";
    return;
  }

  locating.value = true;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const result = await $fetch<AdminLocationResult>("/api/admin/location", {
          method: "POST",
          body: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timezone,
          },
        });

        let filled = false;

        if (result.place) {
          form.place = result.place;
          filled = true;
        }

        if (result.country) {
          form.country = result.country;
          filled = true;
        }

        if (result.timezone) {
          form.timezone = result.timezone;
        }

        if (filled) {
          locationMessage.value = "Location filled from your current position. Review it and save.";
        } else if (result.timezone) {
          locationMessage.value =
            "Timezone filled from your browser. Please add the place and country manually.";
        } else {
          locationError.value =
            "Your location could not be resolved. Please enter the location manually.";
        }
      } catch (error) {
        locationError.value = getErrorMessage(
          error,
          "Location lookup failed. Please enter the location manually.",
        );
      } finally {
        locating.value = false;
      }
    },
    (error) => {
      locating.value = false;

      if (error.code === error.PERMISSION_DENIED) {
        locationError.value =
          "Location permission was denied. You can still enter the location manually.";
      } else if (error.code === error.TIMEOUT) {
        locationError.value =
          "Locating you took too long. You can still enter the location manually.";
      } else {
        locationError.value =
          "Your location is unavailable right now. You can still enter it manually.";
      }
    },
    { timeout: 10_000, maximumAge: 300_000 },
  );
}
</script>

<template>
  <div
    v-if="isCheckingSession"
    class="flex min-h-[60vh] items-center justify-center gap-3 text-muted"
  >
    <UIcon name="i-ph-spinner" class="size-5 animate-spin" />
    <span>Checking your Nuxt Studio session…</span>
  </div>

  <UPage v-else-if="!isAuthenticated">
    <UPageHero
      orientation="horizontal"
      :ui="{ title: 'max-lg:text-center', container: 'pb-16!', root: 'pb-20' }"
    >
      <template #title>
        <div class="tracking-tight">
          Just a Click from<br />
          <span class="text-primary">Admin Access!</span>
        </div>
      </template>
      <UCard
        :ui="{
          root: 'mx-auto w-full max-w-[560px] ring-transparent',
          body: 'flex flex-col items-center gap-6 px-6 py-6 sm:px-16',
        }"
      >
        <UIcon name="i-ph-shipping-container" class="size-12" aria-hidden="true" />
        <div class="flex flex-col items-center gap-1 text-center">
          <h2 class="text-base font-semibold text-highlighted">
            {{
              sessionError
                ? "Sign-in is temporarily unavailable."
                : "Sign in to unlock the full experience."
            }}
          </h2>
          <p class="text-sm leading-6 text-muted">
            {{
              sessionError
                ? "The admin page could not check your Nuxt Studio session. You can still try signing in with GitHub."
                : "Use your GitHub account to manage the contact location and content of this site."
            }}
          </p>
        </div>
        <UButton
          :to="studioLoginRoute"
          color="neutral"
          icon="i-ph-github-logo"
          label="Continue with GitHub"
          block
        />
        <UButton
          v-if="sessionError"
          variant="link"
          color="neutral"
          icon="i-ph-arrow-clockwise"
          label="Check the session again"
          class="px-0"
          @click="refreshSession()"
        />
      </UCard>
    </UPageHero>
  </UPage>

  <UPage v-else>
    <UPageSection
      title="Admin"
      description="Manage the contact location shown on your contacts page."
      :ui="{ container: 'max-w-xl' }"
      class="animate-fade-up pt-8"
    >
      <div class="flex flex-col gap-6">
        <UUser
          :name="session?.user?.name"
          :description="session?.user?.email"
          :avatar="{ icon: 'i-ph-user' }"
        />

        <UAlert
          v-if="savedLocationError"
          color="warning"
          variant="subtle"
          icon="i-ph-warning-circle"
          title="Could not load the saved location"
          description="You can still fill in the form and save new values."
        />

        <UForm :state="form" class="flex flex-col gap-4" @submit="save">
          <UFormField name="place" label="Place" required>
            <UInput v-model="form.place" class="w-full" placeholder="Bratislava" :maxlength="80" />
          </UFormField>

          <UFormField name="country" label="Country" required>
            <UInput v-model="form.country" class="w-full" placeholder="Slovakia" :maxlength="80" />
          </UFormField>

          <UFormField
            name="timezone"
            label="Timezone"
            description="IANA timezone name used for the local time shown on the contacts page."
            required
          >
            <UInput
              v-model="form.timezone"
              class="w-full"
              placeholder="Europe/Bratislava"
              list="admin-timezones"
            />
            <datalist id="admin-timezones">
              <option v-for="zone in COMMON_TIMEZONES" :key="zone" :value="zone" />
            </datalist>
          </UFormField>

          <UAlert
            v-if="locationError"
            color="warning"
            variant="subtle"
            icon="i-ph-warning-circle"
            :title="locationError"
          />
          <UAlert
            v-else-if="locationMessage"
            color="success"
            variant="subtle"
            icon="i-ph-check-circle"
            :title="locationMessage"
          />
          <UAlert
            v-if="saveError"
            color="error"
            variant="subtle"
            icon="i-ph-x-circle"
            :title="saveError"
          />

          <div class="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <UButton
              type="button"
              color="neutral"
              variant="subtle"
              icon="i-ph-crosshair"
              label="Use my location"
              :loading="locating"
              :disabled="saving"
              @click="useMyLocation"
            />
            <UButton
              type="submit"
              icon="i-ph-floppy-disk"
              label="Save"
              :loading="saving"
              :disabled="locating"
            />
          </div>
        </UForm>

        <USeparator />

        <UButton
          to="/contacts"
          variant="link"
          trailing-icon="i-ph-arrow-right"
          label="View the contacts page"
          class="self-start px-0"
        />
      </div>
    </UPageSection>
  </UPage>
</template>
