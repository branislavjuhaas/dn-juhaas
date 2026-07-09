<script setup lang="ts">
type Role = {
  title: string;
  description: string;
};

const roles = [
  {
    title: "Developer",
    description:
      "Engineering high-performance web ecosystems, robust corporate tooling, and self-hosted infrastructure with a sharp eye for detail.",
  },
  {
    title: "Designer",
    description:
      "Creating intuitive and visually appealing user interfaces that enhance the overall user experience and drive engagement.",
  },
  {
    title: "Cyclist",
    description:
      "Exploring the world on two wheels, embracing the freedom of the open road, and challenging myself to push the limits of endurance and speed.",
  },
];

const currentRole = ref(0);

const loadNextRole = () => {
  currentRole.value = (currentRole.value + 1) % roles.length;
};
</script>

<template>
  <UPageHero
    orientation="horizontal"
    :ui="{
      root: 'pt-6',
      title: 'text-4xl font-bold sm:text-5xl relative z-10',
      description: 'relative z-10',
    }">
    <template #title>
      Architect's Strategy,<br />
      <span class="text-primary"> Developer's Execution. </span>
    </template>

    <template #links>
      <UButton size="lg" color="neutral" icon="i-ph-lightning-fill">
        View selected work
      </UButton>
      <UButton
        size="lg"
        color="neutral"
        variant="outline"
        icon="i-ph-text-align-left">
        Read latest blog
      </UButton>
    </template>

    <div
      class="absolute inset-0 -z-10 overflow-hidden select-none pointer-events-none">
      <div
        class="absolute inset-0 mask-[radial-gradient(100%_100%_at_top_center,white,transparent)] opacity-20">
        <svg
          class="h-full w-full stroke-zinc-400 dark:stroke-zinc-700 mask-[radial-gradient(100%_100%_at_top_center,white,transparent)]"
          aria-hidden="true">
          <defs>
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              x="50%">
              <path d="M.5 40V.5H40" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
    </div>
  </UPageHero>
  <USeparator />
  <UPageSection
    orientation="horizontal"
    :ui="{
      title: 'text-3xl font-bold sm:text-4xl lg:text-4xl',
    }">
    <template #title>
      Meet Branislav,
      <FlipWords
        :words="roles.map((role) => role.title)"
        @animation-start="loadNextRole"
        :duration="10000"
        class="text-primary!" />
    </template>

    <template #description>
      <Transition name="fade" mode="out-in">
        <p :key="currentRole" class="text-lg sm:text-xl lg:text-xl">
          {{ roles[currentRole]?.description }}
        </p>
      </Transition>
    </template>
  </UPageSection>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
