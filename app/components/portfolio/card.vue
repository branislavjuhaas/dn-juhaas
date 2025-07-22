<template>
  <NuxtLink
    :to="$localePath({ name: 'portfolio-slug', params: { slug: props.slug } })"
    class="card flex flex-col w-full rounded-2xl border-2 border-ebony gap-4 transition-colors duration-200 overflow-hidden bg-ebony text-peach hover:bg-ocean">
    <div class="flex flex-col gap-0 px-8 pt-5 pb-0">
      <h4>{{ props.title }}</h4>
      <div class="flex flex-row gap-2">
        <ContentChip
          v-if="props.platform"
          :title="props.platform"
          icon="ph:circuitry" />
        <ContentChip
          v-if="props.technology"
          :title="props.technology"
          icon="ph:git-branch" />
      </div>
    </div>
    <div
      class="flex flex-col overflow-hidden w-full! aspect-[17/8]! border-t-2 border-ocean">
      <img
        v-if="props.image"
        :src="props.image"
        alt="Project image"
        class="w-full h-full object-cover" />
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
