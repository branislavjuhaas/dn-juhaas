<template>
  <NuxtLink
    v-if="props.to || props.href"
    :to="props.to || props.href"
    class="chip"
    :class="['chip-' + (props.accent ? 'accent' : 'default')]"
    :target="props.to ? undefined : '_blank'"
    :rel="props.to ? undefined : 'noopener noreferrer'"
    :aria-label="ariaLabel"
    role="link"
    tabindex="0">
    <Icon
      v-if="props.icon"
      :name="props.icon"
      aria-hidden="true"
      focusable="false" />
    <slot>
      {{ props.title }}
    </slot>
  </NuxtLink>
  <span
    v-else
    class="chip"
    :class="['chip-' + (props.accent ? 'accent' : 'default')]"
    role="text"
    :aria-label="ariaLabel"
    tabindex="0">
    <Icon
      v-if="props.icon"
      :name="props.icon"
      size="0.9375rem"
      aria-hidden="true"
      focusable="false" />
    <slot>
      {{ props.title }}
    </slot>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  icon?: string;
  href?: string;
  to?: string;
  accent?: boolean;
}>();

const ariaLabel = props.title
  ? props.icon
    ? `${props.title} (${props.icon})`
    : props.title
  : "Chip";
</script>

<style scoped>
@reference "./../../assets/css/main.css";
.chip {
  @apply flex flex-row text-xs uppercase font-bold items-center gap-1 px-2 py-0.5 rounded-[0.635rem] border-1;
}

.chip-accent {
  @apply bg-peach text-ebony;
}
</style>
