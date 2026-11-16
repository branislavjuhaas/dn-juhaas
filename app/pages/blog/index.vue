<script setup lang="ts">
const { data: blogPage } = await useAsyncData("blog-page", () =>
  queryCollection("blogPage").first(),
);
const { data: posts } = await useAsyncData("blog-posts", () =>
  queryCollection("blog").order("date", "DESC").all(),
);

if (!blogPage.value || !posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Blog could not be loaded",
    fatal: true,
  });
}

useSeoMeta({
  title: blogPage.value.seo.title,
  ogTitle: blogPage.value.seo.title,
  description: blogPage.value.seo.description,
  ogDescription: blogPage.value.seo.description,
});
</script>

<template>
  <UPage v-if="blogPage && posts">
    <UPageHero
      orientation="horizontal"
      :ui="{ title: 'max-lg:text-center', container: 'pb-16!', root: 'pb-20' }"
    >
      <template #title>
        <div class="tracking-tight animate-fade-up" style="--delay: 150ms">
          {{ blogPage.hero.title }}<br />
          <span class="text-primary">{{ blogPage.hero.titleAccent }}</span>
        </div>
      </template>
      <div
        class="flex w-full flex-col justify-center gap-3 animate-fade-up lg:h-50 lg:px-16"
        style="--delay: 250ms"
      >
        <p class="text-base font-semibold text-default">{{ blogPage.newsletter.title }}</p>
        <p class="text-base leading-6 text-dimmed">
          {{ blogPage.newsletter.description }}
        </p>
        <div
          class="flex h-8 items-center gap-2 rounded-md border border-accented bg-default pr-1 pl-2"
          aria-disabled="true"
        >
          <input
            type="email"
            :placeholder="blogPage.newsletter.placeholder"
            disabled
            aria-label="Email address, subscriptions are not available yet"
            class="min-w-0 flex-1 bg-transparent text-sm text-dimmed placeholder:text-dimmed disabled:cursor-not-allowed focus:outline-none"
          />
          <UButton
            :label="blogPage.newsletter.buttonLabel"
            trailing-icon="i-ph-paper-plane-tilt"
            color="neutral"
            size="xs"
            disabled
            class="rounded-[2px]"
          />
        </div>
      </div>
    </UPageHero>
    <USeparator class="animate-fade-in" style="--delay: 400ms; --duration: 1.4s" />
    <UPageSection class="animate-fade-in" style="--delay: 400ms; --duration: 1.4s">
      <ul role="list" class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="post in posts" :key="post.path">
          <BlogCard :post="post" />
        </li>
      </ul>
    </UPageSection>
  </UPage>
</template>
