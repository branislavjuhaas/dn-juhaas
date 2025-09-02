<script setup lang="ts">
import { NuxtLink } from "#components";
import ContentChip from "~/components/content/chip.vue";

definePageMeta({
  layout: "default",
});

const { t } = useI18n();

// get the language as the key of locales "lang"
const lang = t("lang");

const route = useRoute();

const project = await queryCollection(`portfolio_${lang as "sk" | "en"}`)
  .where("slug", "=", route.params.slug)
  .first();

if (!project) {
  throw createError({ statusCode: 404, statusMessage: "Project not found" });
}

useHead({
  title: project.name,
  meta: [
    {
      name: "description",
      content: project.description,
    },
  ],
});

const icon = (status: "active" | "archived" | "planned") => {
  switch (status) {
    case "active":
      return "ph:seal-check-fill";
    case "archived":
      return "ph:seal-fill";
    case "planned":
      return "ph:seal-question-fill";
    default:
      return "ph:seal-fill";
  }
};
const getYearRange = (development: { start: string; end?: string }): string => {
  const startYear = development.start.split("-")[0];
  if (development.end) {
    const endYear = development.end.split("-")[0];
    if (startYear === endYear) {
      return startYear ?? "N/A";
    }
    return `${startYear} - ${endYear}`;
  }
  return `${startYear}+`;
};
</script>

<template>
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
    <div
      class="xl:fixed bg-ebony max-xl:-mx-5 max-xl:-mt-50 text-peach top-0 left-0 xl:h-full xl:w-1/2 pl-5 xl:pl-25 pt-50 xl:pt-[40dvh] pb-12 flex flex-col justify-between items-start gap-32">
      <div class="flex flex-col">
        <h1 class="text-3xl font-bold mb-4">{{ project?.name }}</h1>
        <div class="flex flex-row gap-2">
          <ContentChip
            :icon="icon(project?.development?.status)"
            :title="getYearRange(project?.development)"
            accent />
          <ContentChip
            v-for="tag in project?.tags || []"
            :key="tag.content"
            :title="tag.content"
            :icon="tag.icon" />
        </div>
      </div>
      <div class="flex flex-row gap-8">
        <NuxtLink :to="$localePath('portfolio')" class="social-link-dark">
          <Icon name="ph:arrow-u-up-left" />
          {{ $t("portfolio.return") }}
        </NuxtLink>
        <a
          v-if="project?.link"
          class="social-link-dark"
          :href="project?.link"
          target="_blank"
          rel="noopener noreferrer">
          <Icon name="ph:browsers" />
          {{ $t("portfolio.visit") }}
        </a>
        <a
          v-if="project?.source"
          class="social-link-dark"
          :href="project?.source"
          target="_blank"
          rel="noopener noreferrer">
          <Icon name="ph:github-logo" />
          {{ $t("portfolio.source") }}
        </a>
      </div>
    </div>
    <ContentRenderer
      v-if="project"
      class="xl:col-start-2 text-justify"
      :value="project" />
  </div>
</template>

<style scoped>
@reference "./../../assets/css/main.css";

:deep(a) {
  @apply text-ocean hover:text-ebony transition-colors duration-200;
}

:deep(img) {
  @apply rounded-2xl;
}
</style>
