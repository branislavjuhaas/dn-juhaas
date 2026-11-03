<script setup lang="ts">
const props = defineProps<{
  label: string;
  icon: string;
  to: string;
  ariaLabel: string;
}>();

const NuxtLink = resolveComponent("NuxtLink");

const isExternal = computed(() => /^https?:\/\//i.test(props.to));

const accessibleName = computed(() =>
  isExternal.value ? `${props.ariaLabel} (opens in a new tab)` : props.ariaLabel,
);
</script>

<template>
  <li class="flex w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1.35rem)] xl:w-auto xl:flex-1">
    <UCard
      :as="NuxtLink"
      :to="props.to"
      :target="isExternal ? '_blank' : undefined"
      :rel="isExternal ? 'noopener noreferrer' : undefined"
      :aria-label="accessibleName"
      class="w-full outline-primary/25 transition hover:bg-elevated/50 focus-visible:outline-3 focus-visible:ring-primary font-medium text-base"
      :ui="{ body: 'flex flex-col items-center gap-4' }"
    >
      <UIcon :name="props.icon" class="size-8" aria-hidden="true" />
      <span>{{ props.label }}</span>
    </UCard>
  </li>
</template>
