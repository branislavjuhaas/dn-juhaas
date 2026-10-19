<script setup lang="ts">
import { motion, useScroll, useTransform } from "motion-v";

useSeoMeta({
  titleTemplate: "Branislav Juhás",
  ogTitle: "Branislav Juhás",
  description:
    "Architect & developer building scalable web applications, modern cloud infrastructure, and developer tooling. Combining clean architecture with end-to-end technical execution.",
  ogDescription:
    "Architect & developer building scalable web applications, modern cloud infrastructure, and developer tooling. Combining clean architecture with end-to-end technical execution.",
});

const { scrollYProgress } = useScroll();

const waveY = useTransform(scrollYProgress, [0, 0.6], ["0px", "-100px"]);
const waveScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.1]);
const waveOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
</script>

<template>
  <UPage class="overflow-hidden">
    <UPageHero
      description="Building scalable web applications, modern cloud infrastructure, and developer tooling. Combining clean architecture with end-to-end technical execution."
      :links="[
        { label: 'Explore projects', icon: 'i-ph-sparkle', to: '/projects' },
        {
          label: 'Contact me',
          icon: 'i-ph-mailbox',
          variant: 'outline',
          color: 'neutral',
          to: '/contacts',
        },
      ]"
      :ui="{ description: 'text-wrap max-w-5xl mx-auto', container: 'pb-16!' }"
    >
      <template #title>
        Architect's Strategy,<br /><span class="text-primary">Developer's Execution</span>
      </template>
    </UPageHero>

    <!-- Combined Motion Transform Wrapper -->
    <motion.div
      class="w-full relative pointer-events-none will-change-transform origin-center"
      :style="{
        y: waveY,
        scale: waveScale,
        opacity: waveOpacity,
      }"
    >
      <Waves />
    </motion.div>

    <UPageSection />
  </UPage>
</template>
