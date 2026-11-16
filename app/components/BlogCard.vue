<script setup lang="ts">
const props = defineProps<{
  post: {
    path: string;
    title: string;
    description: string;
    image: string;
  };
}>();
</script>

<template>
  <NuxtLink
    :to="props.post.path"
    class="flex h-full flex-col gap-4 rounded-[calc(var(--ui-radius)*2)] border border-default bg-default p-6 outline-primary/25 transition hover:bg-elevated/50 focus-visible:outline-3 focus-visible:outline-primary focus-visible:ring-primary"
  >
    <div
      class="aspect-video w-full overflow-hidden rounded-lg border border-accented bg-elevated/50"
    >
      <img
        :src="props.post.image"
        :alt="props.post.title"
        width="800"
        height="450"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover"
      />
    </div>
    <div class="flex flex-col">
      <h2 class="text-base font-semibold leading-6 text-highlighted">
        {{ props.post.title }}
      </h2>
      <p class="mt-1 text-[15px] leading-6 text-muted">
        {{ props.post.description }}
      </p>
    </div>
  </NuxtLink>
</template>
