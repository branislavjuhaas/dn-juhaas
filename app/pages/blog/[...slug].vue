<script setup lang="ts">
const route = useRoute();

const { data: post } = await useAsyncData(`blog-post-${route.path}`, () =>
  queryCollection("blog").path(route.path).first(),
);

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Blog post could not be loaded",
    fatal: true,
  });
}

useSeoMeta({
  title: post.value.title,
  ogTitle: post.value.title,
  description: post.value.description,
  ogDescription: post.value.description,
  ogImage: post.value.image,
});
</script>

<template>
  <UPage v-if="post">
    <UPageSection>
      <article class="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <div class="flex flex-col gap-6">
          <UButton
            to="/blog"
            variant="link"
            color="neutral"
            icon="i-ph-arrow-left"
            label="Back to blog"
            class="self-start p-0"
          />
          <div
            class="aspect-video w-full overflow-hidden rounded-[calc(var(--ui-radius)*2)] border border-accented bg-elevated/50"
          >
            <img
              :src="post.image"
              :alt="post.title"
              width="800"
              height="450"
              decoding="async"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="flex flex-col gap-3">
            <h1 class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
              {{ post.title }}
            </h1>
            <p class="text-lg text-muted">
              {{ post.description }}
            </p>
          </div>
        </div>
        <div
          class="text-base leading-7 text-muted [&_a]:text-primary [&_a]:underline [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-highlighted [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:text-highlighted [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
        >
          <ContentRenderer :value="post" />
        </div>
      </article>
    </UPageSection>
  </UPage>
</template>
