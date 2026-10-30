<script setup lang="ts">
import { motion, useScroll, useTransform } from "motion-v";

const { data: home } = await useAsyncData("home", () => queryCollection("home").first());

if (!home.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Home content could not be loaded",
    fatal: true,
  });
}

useSeoMeta({
  titleTemplate: home.value.seo.title,
  ogTitle: home.value.seo.title,
  description: home.value.seo.description,
  ogDescription: home.value.seo.description,
});

// Hero Waves Parallax
const { scrollYProgress: globalScroll } = useScroll();

const waveY = useTransform(globalScroll, [0, 0.4], ["0px", "-200px"]);
const waveScale = useTransform(globalScroll, [0, 0.4], [1, 1.08]);
const waveOpacity = useTransform(globalScroll, [0, 0.35], [1, 0]);

// Section Compressed Parallax
const sectionRef = useTemplateRef<HTMLDivElement>("sectionRef");

const { scrollYProgress: sectionProgress } = useScroll({
  target: sectionRef,
  offset: ["start 95%", "start 35%"],
});

const sectionY = useTransform(sectionProgress, [0, 1], ["200px", "0px"]);
const sectionOpacity = useTransform(sectionProgress, [0, 0.6], [0, 1]);
</script>

<template>
  <UPage v-if="home" class="overflow-hidden">
    <UPageHero
      :ui="{
        description: 'text-wrap max-w-5xl mx-auto',
        container: 'pb-8! lg:pt-[calc(max(2rem,20vh))]',
        root: 'min-h-[calc(100vh-var(--ui-header-height))] mb-4',
      }"
    >
      <template #title>
        <div class="tracking-tight animate-fade-up" style="--delay: 150ms">
          {{ home.hero.title }}<br />
          <span class="text-primary">{{ home.hero.titleAccent }}</span>
        </div>
      </template>

      <template #description>
        <div class="text-neutral-400 animate-fade-up" style="--delay: 250ms">
          {{ home.hero.description }}
        </div>
      </template>

      <template #links>
        <div
          class="flex flex-wrap items-center justify-center gap-4 pt-2 animate-fade-up"
          style="--delay: 350ms"
        >
          <UButton v-for="link in home.hero.links" :key="link.to" v-bind="link" size="lg" />
        </div>
      </template>

      <div class="relative -mt-8 animate-fade-in" style="--delay: 400ms; --duration: 1.4s">
        <motion.div
          class="w-[110vw] absolute left-1/2 -translate-x-1/2 pointer-events-none origin-center will-change-[transform,opacity] transform-[translateZ(0)]"
          :style="{
            y: waveY,
            scale: waveScale,
            '--wave-opacity': waveOpacity,
            opacity: 'var(--wave-opacity)',
          }"
        >
          <Waves />
        </motion.div>
      </div>
    </UPageHero>

    <!-- Parallax Section Wrapper -->
    <div ref="sectionRef" class="w-full">
      <motion.div
        class="will-change-[transform,opacity] transform-[translateZ(0)]"
        :style="{
          y: sectionY,
          opacity: sectionOpacity,
        }"
      >
        <UPageSection
          :features="home.about.features"
          orientation="horizontal"
          :description="home.about.description"
          :ui="{
            container: 'xl:pt-0 lg:flex lg:flex-col xl:grid xl:grid-cols-2 xl:items-center',
            wrapper: 'xl:order-last',
            title: 'text-center xl:text-left',
            description: 'text-center xl:text-left text-pretty',
            features: 'sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-4 xl:grid-cols-1',
          }"
        >
          <template #title>
            {{ home.about.title }} <span class="text-primary">{{ home.about.titleAccent }}</span>
          </template>
          <Satelites
            :items="home.about.badges"
            :avatar-src="home.about.avatar.src"
            :avatar-alt="home.about.avatar.alt"
            :max-arc="110"
            :max-step="70"
            :radius="140"
          />
        </UPageSection>

        <USeparator />

        <UPageSection :ui="{ container: 'sm:gap-9' }">
          <figure class="flex flex-col items-center gap-6">
            <blockquote class="text-xl text-center text-muted">
              {{ home.testimonial.quote }}
            </blockquote>
            <figcaption>
              <UUser
                :name="home.testimonial.author.name"
                :description="home.testimonial.author.description"
                size="2xl"
                class="mx-auto"
                :avatar="{
                  src: home.testimonial.author.avatar,
                }"
              />
            </figcaption>
          </figure>
        </UPageSection>
      </motion.div>
    </div>
  </UPage>
</template>
