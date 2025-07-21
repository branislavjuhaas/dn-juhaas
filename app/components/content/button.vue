<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :target="target"
    :rel="rel"
    class="button"
    :class="`button-${accent ? 'accent' : 'standard'}`">
    <Icon v-if="icon" :name="icon" />
    <slot>
      {{ text }}
    </slot>
  </NuxtLink>
  <a
    v-else
    :href="href"
    :target="target"
    :rel="rel"
    class="button"
    :class="`button-${accent ? 'accent' : 'standard'}`">
    <Icon v-if="icon" :name="icon" />
    <slot>
      {{ text }}
    </slot>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  icon?: string;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  accent?: boolean;
}>();
</script>

<style scoped>
@reference "./../../assets/css/main.css";
.button {
  @apply flex flex-row items-center gap-2 px-4 py-1.5 rounded-2xl border-2 border-ebony w-50 transition-colors duration-200;
}

.button-standard {
  @apply bg-white hover:bg-ebony hover:text-white;
}
.button-accent {
  @apply bg-sky hover:bg-ebony hover:text-sky;
}
</style>
