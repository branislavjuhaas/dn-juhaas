<template>
  <div class="flex flex-col w-full gap-8">
    <div
      class="flex flex-col"
      aria-labelledby="portfolio-heading"
      aria-describedby="portfolio-description">
      <h1 id="portfolio-heading" tabindex="0">{{ $t("portfolio.heading") }}</h1>
      <p id="portfolio-description">
        {{ $t("portfolio.description") }}
      </p>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12"
      role="list"
      aria-label="Portfolio items">
      <PortfolioCard
        v-for="item in portfolio"
        :key="item.id"
        :slug="item.slug"
        :title="item.name"
        :platform="item.platform"
        :technology="item.technology"
        :image="item.image"
        role="listitem"
        :aria-label="`${item.name}, ${item.platform}, ${item.technology}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PortfolioCard } from "#components";

const { t, locale } = useI18n();
const i18nHead = useLocaleHead();

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
}));

useSeoMeta({
  title: t("portfolio.title"),
  meta: [
    {
      name: "description",
      content: t("portfolio.description"),
    },
  ],
});

const portfolio = await queryCollection(
  `portfolio_${locale.value.substring(0, 2)}`,
)
  .order("development", "ASC")
  .all();
</script>

<style scoped></style>
