<template>
  <div class="flex flex-col h-[calc(100dvh-12.5rem)] justify-between relative">
    <div class="flex flex-col">
      <div class="flex flex-col sm:flex-row text-nowrap">
        <h1>{{ $t("home.greeting") }}&nbsp;</h1>
        <h1>&rarr; {{ animatedTitle }}</h1>
      </div>
      <transition name="fade" mode="out-in">
        <p v-if="animatedSubtitle" :key="animatedSubtitle">
          {{ animatedSubtitle }}
        </p>
      </transition>
      <div class="flex flex-row gap-3 mt-2 max-w-fill">
        <ContentButton
          :to="$localePath('portfolio')"
          :text="$t('home.portfolio')"
          icon="ph:flag-banner-fold-fill"
          accent />
        <ContentButton
          :to="$localePath('skills')"
          :text="$t('home.skills')"
          icon="ph:certificate-fill" />
        <ContentButton
          :to="$localePath('about')"
          :text="$t('home.more')"
          icon="ph:signpost-fill" />
      </div>
    </div>
    <div class="w-full md:w-fit flex flex-col items-center">
      <div
        class="mb-14 max-md:bg-peach px-4 py-2 border-2 rounded-2xl md:p-0 md:rounded-none md:border-0 flex flex-row gap-8">
        <a
          class="social-link"
          href="https://github.com/branislavjuhaas"
          target="_blank"
          rel="noopener noreferrer">
          <Icon name="ph:github-logo" />
          GitHub
        </a>
        <a
          class="social-link"
          href="https://www.linkedin.com/in/juhaas/"
          target="_blank"
          rel="noopener noreferrer">
          <Icon name="ph:linkedin-logo" />
          LinkedIn
        </a>
      </div>
    </div>
    <img
      src="./../assets/images/juhaas.webp"
      alt="Branislav's photo"
      class="absolute aspect-square w-125 max-h-[calc(100dvh-30rem)] md:max-h-[calc(100dvh-20rem)] xl:max-h-none right-1/2 max-md:translate-x-3/5 bottom-0 md:right-0 -z-10 object-contain" />
  </div>
</template>

<script setup lang="ts">
import { useTitleAnimator } from "~/composables/useTitleAnimator";
import { useTitles } from "~/composables/useTitles";
import ContentButton from "~/components/content/button.vue";

const { t } = useI18n();
const i18nHead = useLocaleHead();

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
}));

useSeoMeta({
  title: t("home.title"),
  meta: [
    {
      name: "description",
      content: t("home.description"),
    },
  ],
});

const titles = useTitles();
definePageMeta({
  layout: "minimal",
});

const { animatedTitle, animatedSubtitle } = useTitleAnimator(
  titles,
  false,
  true,
);
</script>

<style scoped>
@reference "./../assets/css/main.css";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
