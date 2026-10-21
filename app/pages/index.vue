<script setup lang="ts">
import type { PageFeatureProps } from "@nuxt/ui";
import { motion, useScroll, useTransform } from "motion-v";
import type { BadgeItem } from "~/components/Satelites.vue";

const descriptionText =
  "Architect & developer building scalable web applications, modern cloud infrastructure, and developer tooling. Combining clean architecture with end-to-end technical execution.";

useSeoMeta({
  titleTemplate: "Branislav Juhás",
  ogTitle: "Branislav Juhás",
  description: descriptionText,
  ogDescription: descriptionText,
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

// Plain constant for static feature items
const features: PageFeatureProps[] = [
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
    class: "sm:col-span-2 sm:max-w-1/2 sm:mx-auto lg:col-span-1 lg:max-w-full",
  },
];

const profileBadges: BadgeItem[] = [
  { title: "Full-Stack & Cloud Dev", icon: "i-ph-cloud-check" },
  { title: "Academic Weapon", icon: "i-ph-exam" },
  { title: "Endurance Cyclist", icon: "i-ph-mountains" },
  { title: "Non-Profit Lead", icon: "i-ph-handshake" },
  { title: "'24 Debate Champion", icon: "i-ph-medal" },
];
</script>

<template>
  <UPage class="overflow-hidden">
    <UPageHero
      :ui="{
        description: 'text-wrap max-w-5xl mx-auto',
        container: 'pb-8! lg:pt-[calc(max(2rem,20vh))]',
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
          {{ descriptionText }}
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
          description="Where software architecture, competitive debate, and endurance sports intersect. Driven by logic, discipline, and execution."
          :ui="{
            container: 'xl:pt-0 lg:flex lg:flex-col xl:grid xl:grid-cols-2 xl:items-center',
            wrapper: 'xl:order-last',
            title: 'text-center xl:text-left',
            description: 'text-center xl:text-left text-pretty',
            features: 'sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-4 xl:grid-cols-1',
          }"
        >
          <template #title> Meet <span class="text-primary">Branislav</span> </template>
          <Satelites
            :items="profileBadges"
            avatar-src="/assets/avatars/branislav-juhas.jpg"
            avatar-alt="Branislav Juhás"
            :max-arc="110"
            :max-step="70"
            :radius="140"
          />
        </UPageSection>

        <USeparator />

        <UPageSection :ui="{ container: 'sm:gap-9' }">
          <figure class="flex flex-col items-center gap-6">
            <blockquote class="text-xl text-center text-muted">
              "Branislav is a unicorn. In 16 years of Sučany Alumni leadership, I haven't met anyone
              who so seamlessly combines deep technical skill, patience, and superior communication.
              His active input and technical solutions were crucial to our success."
            </blockquote>
            <figcaption>
              <UUser
                name="Tomáš Jacko"
                description="CEO & Compliance Partner"
                size="2xl"
                class="mx-auto"
                :avatar="{
                  src: '/assets/avatars/tomas-jacko.jpg',
                }"
              />
            </figcaption>
          </figure>
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
