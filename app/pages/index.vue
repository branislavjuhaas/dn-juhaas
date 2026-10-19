<script setup lang="ts">
import { motion, useScroll, useTransform } from "motion-v";

const descriptionText =
  "Architect & developer building scalable web applications, modern cloud infrastructure, and developer tooling. Combining clean architecture with end-to-end technical execution.";

useSeoMeta({
  titleTemplate: "Branislav Juhás",
  ogTitle: "Branislav Juhás",
  description: descriptionText,
  ogDescription: descriptionText,
});

const { scrollYProgress } = useScroll();

const waveY = useTransform(scrollYProgress, [0, 0.6], ["0px", "-100px"]);
const waveScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.1]);
const waveOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
</script>

<template>
  <UPage class="overflow-hidden">
    <UPageHero :ui="{ description: 'text-wrap max-w-3xl mx-auto', container: 'pb-12!' }">
      <!-- Staggered Title -->
      <template #title>
        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.15 }"
          class="tracking-tight"
        >
          Architect's Strategy,<br />
          <span class="text-primary"> Developer's Execution </span>
        </motion.div>
      </template>

      <!-- Staggered Description -->
      <template #description>
        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.25 }"
          class="text-neutral-400 leading-relaxed text-balance"
        >
          Building scalable web applications, modern cloud infrastructure, and developer tooling.
          Combining clean architecture with end-to-end technical execution.
        </motion.div>
      </template>

      <!-- Interactive Animated Buttons -->
      <template #links>
        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, ease: 'easeOut', delay: 0.35 }"
          class="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <UButton
            label="Explore projects"
            icon="i-ph-sparkle"
            size="lg"
            to="/projects"
            class="font-semibold shadow-sm"
          />
          <UButton
            label="Contact me"
            icon="i-ph-mailbox"
            variant="outline"
            color="neutral"
            size="lg"
            to="/contacts"
            class="font-semibold"
          />
        </motion.div>
      </template>
    </UPageHero>

    <!-- Parallax Waves Overlay -->
    <motion.div
      class="w-full relative pointer-events-none will-change-transform origin-center"
      :style="{
        y: waveY,
        scale: waveScale,
        opacity: waveOpacity,
      }"
      :initial="{
        opacity: 0,
      }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.8, ease: 'easeOut', delay: 0.4 }"
    >
      <Waves />
    </motion.div>

    <UPageSection />
  </UPage>
</template>
