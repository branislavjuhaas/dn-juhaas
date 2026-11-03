import type { MaybeRefOrGetter } from "vue";

/**
 * Live clock for a time zone. The initial timestamp is server-rendered so
 * hydration matches, then it is refreshed on the client from the visitor's
 * own clock.
 */
export function useLocalTime(timeZone: MaybeRefOrGetter<string>) {
  const timestamp = useState("local-time-timestamp", () => Date.now());

  const zone = computed(() => toValue(timeZone));

  const formatParts = (options: Intl.DateTimeFormatOptions) => {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        timeZone: zone.value,
        ...options,
      }).formatToParts(new Date(timestamp.value));
    } catch {
      return [] as Intl.DateTimeFormatPart[];
    }
  };

  const timeParts = computed(() =>
    formatParts({ hour: "numeric", minute: "2-digit", hour12: false }),
  );

  const zoneParts = computed(() => formatParts({ timeZoneName: "short" }));

  const time = computed(() => {
    const hour = timeParts.value.find((part) => part.type === "hour")?.value;
    const minute = timeParts.value.find((part) => part.type === "minute")?.value;
    return hour && minute ? `${hour}:${minute}` : "--:--";
  });

  const abbreviation = computed(
    () => zoneParts.value.find((part) => part.type === "timeZoneName")?.value ?? zone.value,
  );

  const hour = computed(() => {
    const value = Number(timeParts.value.find((part) => part.type === "hour")?.value ?? 0);
    return Number.isFinite(value) ? value % 24 : 0;
  });

  let refreshTimer: ReturnType<typeof setInterval> | undefined;

  onMounted(() => {
    timestamp.value = Date.now();
    refreshTimer = setInterval(() => {
      timestamp.value = Date.now();
    }, 15_000);
  });

  onUnmounted(() => {
    if (refreshTimer) clearInterval(refreshTimer);
  });

  return { time, abbreviation, hour };
}
