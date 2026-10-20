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
    <UPageHero :ui="{ description: 'text-wrap max-w-5xl mx-auto', container: 'pb-12!' }">
      <template #title>
        <div class="tracking-tight animate-fade-up" style="--delay: 150ms">
          Architect's Strategy,<br />
          <span class="text-primary"> Developer's Execution </span>
        </div>
      </template>

      <template #description>
        <div class="text-neutral-400 animate-fade-up" style="--delay: 250ms">
          Building scalable web applications, modern cloud infrastructure, and developer tooling.
          Combining clean architecture with end-to-end technical execution.
        </div>
      </template>

      <template #links>
        <div
          class="flex flex-wrap items-center justify-center gap-4 pt-2 animate-fade-up"
          style="--delay: 350ms"
        >
          <UButton label="Explore projects" icon="i-ph-sparkle" size="lg" to="/projects" />
          <UButton
            label="Contact me"
            icon="i-ph-mailbox"
            variant="outline"
            color="neutral"
            size="lg"
            to="/contacts"
          />
        </div>
      </template>
    </UPageHero>

    <div class="animate-fade-in" style="--delay: 400ms; --duration: 1.4s">
      <motion.div
        class="w-full relative pointer-events-none origin-center will-change-[transform,opacity] transform-[translateZ(0)]"
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

    <UPageSection />
  </UPage>
</template>

<style scoped>
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-up {
  opacity: 0;
  animation: fadeUp var(--duration, 0.5s) cubic-bezier(0, 0, 0.2, 1) both;
  animation-delay: var(--delay, 0ms);
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn var(--duration, 0.8s) cubic-bezier(0, 0, 0.2, 1) both;
  animation-delay: var(--delay, 0ms);
}
</style>
