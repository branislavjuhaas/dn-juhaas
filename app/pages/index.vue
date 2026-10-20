<script setup lang="ts">
import type { PageFeatureProps } from "@nuxt/ui";
import { motion, useScroll, useTransform } from "motion-v";

const descriptionText =
  "Architect & developer building scalable web applications, modern cloud infrastructure, and developer tooling. Combining clean architecture with end-to-end technical execution.";

useSeoMeta({
  titleTemplate: "Branislav Juhás",
  ogTitle: "Branislav Juhás",
  description: descriptionText,
  ogDescription: descriptionText,
});

// 1. Hero Waves Parallax
const { scrollYProgress: globalScroll } = useScroll();

const waveY = useTransform(globalScroll, [0, 0.4], ["0px", "-80px"]);
const waveScale = useTransform(globalScroll, [0, 0.4], [1, 1.08]);
const waveOpacity = useTransform(globalScroll, [0, 0.35], [1, 0]);

// 2. Section Compressed Parallax
const sectionRef = useTemplateRef("sectionRef");

const { scrollYProgress: sectionProgress } = useScroll({
  target: sectionRef,
  // Starts when section top reaches 95% of viewport (just entering)
  // Finishes completely when section top reaches 35% of viewport (upper-middle)
  offset: ["start 95%", "start 35%"],
});

// Accelerated 140px rise that snaps to 0px long before hitting page bottom
const sectionY = useTransform(sectionProgress, [0, 1], ["200px", "0px"]);
const sectionOpacity = useTransform(sectionProgress, [0, 0.6], [0, 1]);

const features = ref<PageFeatureProps[]>([
  {
    title: "Full-Stack Engineer & Architect",
    description:
      "Building scalable web platforms, desktop tools, and cloud infrastructure. Focused on clean system architecture, maintainability, and speed.",
    icon: "i-ph-head-circuit",
  },
  {
    title: "Debater & Community Lead",
    description:
      "National Academic Debate Champion active in non-profits. Using structured logic and communication to bring projects together.",
    icon: "i-ph-hand-heart",
  },
  {
    title: "Endurance Road Cyclist",
    description:
      "Tackling long-distance mountain passes and elevation gains. Bringing pacing, grit, and discipline straight into long-term project management.",
    icon: "i-ph-bicycle",
  },
]);
</script>

<template>
  <UPage class="overflow-hidden">
    <UPageHero
      :ui="{
        description: 'text-wrap max-w-5xl mx-auto',
        container: 'pb-8!',
        root: 'min-h-[calc(100vh-var(--ui-header-height))] mb-4',
      }"
    >
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
          :features="features"
          orientation="horizontal"
          reverse
          description="Where software architecture, competitive debate, and endurance sports intersect. Driven by logic, discipline, and execution."
          :ui="{ container: 'lg:pt-0' }"
        >
          <template #title> Meet <span class="text-primary">Branislav</span> </template>
        </UPageSection>

        <USeparator />

        <UPageSection :ui="{ container: 'sm:gap-9' }">
          <div class="text-xl text-center text-muted">
            Branislav is a unicorn. In 16 years of Sučany Alumni leadership, I haven't met anyone
            who so seamlessly combines deep technical skill, patience, and superior communication.
            His active input and technical solutions were crucial to our success.
          </div>
          <UUser
            name="Tomáš Jacko"
            description="CEO & Compliance Partner"
            size="2xl"
            class="mx-auto"
            :avatar="{
              src: '/assets/avatars/tomas-jacko.jpg',
            }"
          />
        </UPageSection>
      </motion.div>
    </div>
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
