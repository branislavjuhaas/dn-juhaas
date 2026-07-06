<script setup lang="ts"></script>

<template>
  <UPageHero
    orientation="horizontal"
    :ui="{
      root: 'pt-6',
      container: 'px-0 sm:px-0 lg:px-0',
      title: 'text-4xl font-bold tracking-tight sm:text-5xl relative z-10',
      description: 'relative z-10',
    }">
    <template #title>
      Architect's Strategy.<br />
      <span class="text-primary"> Developer's Execution. </span>
    </template>

    <template #links>
      <UButton size="lg" color="neutral" icon="i-ph-lightning-fill">
        Explore engineering
      </UButton>
      <UButton
        size="lg"
        color="neutral"
        variant="outline"
        icon="i-ph-text-align-left">
        Read latest blog
      </UButton>

      <span
        class="text-lg sm:text-xl/8 text-muted text-pretty mt-6 relative z-10"></span>
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
</template>

<style scoped></style>
