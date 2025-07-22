<template>
  <NuxtLink
    :to="$localePath({ name: 'portfolio-slug', params: { slug: props.slug } })"
    class="card flex flex-col w-full rounded-2xl border-2 border-ebony gap-4 transition-colors duration-200 overflow-hidden"
    :class="['card-' + (props.dark ? 'dark' : 'light')]">
    <div class="flex flex-col gap-0 px-8 pt-5 pb-0">
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
    <div class="flex flex-col overflow-hidden w-full! h-48! border-t-2">
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
@reference "./../../assets/css/main.css";

.card-dark {
  @apply bg-ebony text-peach;
}
.card-light {
  @apply text-ebony;
}

.card:hover img {
  transform: scale(1.1);
}

img {
  transition: transform 0.3s ease-in-out;
  transform-origin: center;
}
</style>
