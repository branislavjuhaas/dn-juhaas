<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[]>([
  {
    label: "Work",
    icon: "i-ph-swatches",
    to: "/work",
    children: [
      {
        label: "Featured",
        description: "The most influential of recent work.",
        icon: "i-ph-sparkle",
      },
      {
        label: "Party tools",
        description: "Collection of open source fun gadgets.",
        icon: "i-ph-confetti",
      },
      {
        label: "3rd party",
        description: "Contributions to core open-source ecosystems.",
        icon: "i-ph-hand-heart",
      },
    ],
  },
  {
    label: "Stack",
    to: "/stack",
    icon: "i-ph-gear-six",
    children: [
      {
        label: "Tools",
        description: "The tools I use to build things.",
        icon: "i-ph-sparkle",
      },
      {
        label: "Development stack",
        description: "The tools and libraries I use to build things.",
        icon: "i-ph-gear-six",
      },
    ],
  },
  {
    label: "Blog",
    icon: "i-ph-newspaper-clipping",
    to: "/blog",
  },
]);
</script>

<template>
  <UHeader :toggle="false">
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-2" aria-label="Domov">
        <JuhaasLogo />
      </NuxtLink>
    </template>
    <template #right>
      <UNavigationMenu :items="items" class="w-full justify-end" />
    </template>
  </UHeader>
</template>

<style scoped></style>
