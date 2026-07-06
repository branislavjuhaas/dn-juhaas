<script setup lang="ts">
import { version } from "~~/package.json";
import type { FooterColumn } from "@nuxt/ui";

const source = "https://github.com/branislavjuhaas";
</script>

<template>
  <USeparator />
  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer> /uhaas </UContainer>
    </template>
    <template #left>
      <p class="text-muted text-sm">Copyright © 2024 - 2026 Branislav Juhás</p>
    </template>
    <template #right>
      <UBadge variant="subtle" color="primary" class="mr-1"
        >v{{ version }}</UBadge
      >
      <UColorModeButton />
      <UButton
        icon="ph:github-logo"
        color="neutral"
        variant="ghost"
        :to="source"
        target="_blank"
        aria-label="GitHub" />
    </template>
  </UFooter>
</template>

<style scoped></style>
