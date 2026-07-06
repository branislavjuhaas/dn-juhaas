<script setup lang="ts"></script>

<template>
  <UPageHero
    align="center"
    :ui="{
      root: 'pt-10',
      title: 'text-4xl font-bold tracking-tight sm:text-6xl relative z-10',
      description: 'relative z-10',
    }">
    <template #headline> </template>

    <template #title>
      Architect's Strategy.<br />
      <span class="text-primary"> Developer's Execution. </span>
    </template>

    <template #description>
      <span class="font-bold text-default">Meet Branislav</span>, engineer of
      high-performance web ecosystems.
    </template>

    <template #links> </template>

    <div
      class="absolute inset-0 -z-10 overflow-hidden select-none pointer-events-none">
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-125 opacity-50 blur-[120px]">
        <div
          class="absolute top-12 left-1/4 w-72 h-72 rounded-full bg-primary-500/60 animate-float-slow" />
        <div
          class="absolute top-20 right-1/4 w-80 h-80 rounded-full bg-secondary-500/40 animate-float-delayed" />
      </div>

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
</template>

<style scoped>
@keyframes floatSlow {
  0%,
  100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-30px) translateX(20px) scale(1.1);
  }
}

@keyframes floatDelayed {
  0%,
  100% {
    transform: translateY(0px) scale(1.1);
  }
  50% {
    transform: translateY(40px) translateX(-30px) scale(0.9);
  }
}

.animate-float-slow {
  animation: floatSlow 20s ease-in-out infinite;
}

.animate-float-delayed {
  animation: floatDelayed 25s ease-in-out infinite;
}
</style>
