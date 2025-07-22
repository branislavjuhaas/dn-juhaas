<template>
  <div class="flex flex-col w-full gap-8">
    <div class="flex flex-col">
      <h1>{{ $t("portfolio.heading") }}</h1>
      <p>
        {{ $t("portfolio.description") }}
      </p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
      <PortfolioCard
        v-for="(item, index) in portfolio"
        :key="item.id"
        :slug="item.slug"
        :title="item.name"
        :platform="item.platform"
        :technology="item.technology"
        :image="item.image"
        :dark="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PortfolioCard } from "#components";

definePageMeta({
  layout: "default",
});

useHead({
  title: "Portfolio",
  meta: [
    {
      name: "description",
      content:
        "A selection of my finest work, showcasing my skills and projects.",
    },
  ],
});

// Preparation for i18n: Language selection is currently hardcoded to "sk".
// In the future, this can be replaced with a dynamic language selection based on user preference or locale.
const lang = "sk";

//Sort alphabetically by development.start
const portfolio = await queryCollection(`portfolio_${lang}`)
  .order("development", "ASC")
  .all();
</script>

<style scoped></style>
