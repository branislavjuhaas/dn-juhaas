<script setup lang="ts">
const props = defineProps<{
  icon: string;
  fact: string;
  unit: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <UIcon :name="props.icon" class="size-8" />
    <span class="font-medium text-base">
      <span class="text-primary font-bold">
        {{ props.fact }}
      </span>
      {{ props.unit }}
    </span>
  </div>
</template>
