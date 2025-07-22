<template>
  <NuxtLink
    :to="$localePath({ name: 'portfolio-slug', params: { slug: props.slug } })"
    class="card flex flex-col w-full rounded-2xl border-2 border-ebony gap-4 transition-colors duration-200 overflow-hidden bg-ebony text-peach hover:bg-ocean"
    :aria-label="`View details for ${props.title}`"
    role="link"
    tabindex="0">
    <div class="flex flex-col gap-0 px-8 pt-5 pb-0">
      <h4 id="card-title-{{props.slug}}">{{ props.title }}</h4>
      <div
        class="flex flex-row gap-2"
        aria-label="Project platform and technology">
        <ContentChip
          v-if="props.platform"
          :title="props.platform"
          icon="ph:circuitry"
          aria-label="Platform: {{ props.platform }}" />
        <ContentChip
          v-if="props.technology"
          :title="props.technology"
          icon="ph:git-branch"
          aria-label="Technology: {{ props.technology }}" />
      </div>
    </div>
    <div
      class="flex flex-col overflow-hidden w-full! aspect-[17/8]! border-t-2 border-ocean"
      role="img"
      :aria-labelledby="`card-title-${props.slug}`">
      <img
        v-if="props.image"
        :src="props.image"
        :alt="`${props.title} project image`"
        class="w-full h-full object-cover"
        loading="lazy"
        decoding="async" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import ContentChip from "~/components/content/chip.vue";

const props = defineProps<{
  slug: string;
  title: string;
  platform: string;
  technology: string;
  image: string;
  dark?: boolean;
}>();
</script>

<style scoped>
.card:hover img {
  transform: scale(1.1);
}

img {
  transition: transform 0.3s ease-in-out;
  transform-origin: center;
}
</style>
