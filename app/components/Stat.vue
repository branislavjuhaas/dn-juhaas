<script setup lang="ts">
const props = defineProps<{
  icon: string;
  fact: string;
  unit?: string;
  label?: string;
}>();

const accessibleLabel = computed(
  () => props.label ?? [props.fact, props.unit].filter(Boolean).join(" "),
);
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <UIcon :name="props.icon" class="size-8" aria-hidden="true" />
    <span class="font-medium text-base" aria-hidden="true">
      <span class="text-primary font-bold">
        {{ props.fact }}
      </span>
      <template v-if="props.unit">&nbsp;{{ props.unit }}</template>
    </span>
    <span class="sr-only">{{ accessibleLabel }}</span>
  </div>
</template>
