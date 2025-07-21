<template>
  <NuxtLink
    :to="`/portfolio/${props.slug}`"
    class="flex flex-col w-full rounded-2xl p-8 border-2 border-ebony gap-4 transition-colors duration-200 text-ebony hover:bg-ebony hover:text-peach">
    <div class="flex flex-col gap-0">
      <h4>{{ props.title }}</h4>
      <div class="flex flex-row gap-2">
        <ContentChip
          v-if="props.platform"
          :title="props.platform"
          icon="ph:circuitry"
          :dark="props.dark" />
        <ContentChip
          v-if="props.technology"
          :title="props.technology"
          icon="ph:git-branch"
          :dark="props.dark" />
      </div>
    </div>
    <img
      v-if="props.image"
      :src="props.image"
      alt="Project image"
      class="w-full aspect-video object-cover rounded-[0.625rem] border-2" >
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
}>();
</script>

<style scoped>
@reference "./../../assets/css/main.css";
</style>
