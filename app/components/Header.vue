<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});

const navItems = ref<NavigationMenuItem[]>([
  {
    label: "Projects",
    to: "/projects",
  },
  {
    label: "Blog",
    to: "/blog",
  },
  {
    label: "Contacts",
    to: "/contacts",
  },
]);

const githubLink = "https://github.com/branislavjuhaas";
const linkedinLink = "https://www.linkedin.com/in/juhaas";
const mailLink = "mailto:branislav@juhaas.dev";
</script>

<template>
  <UHeader class="border-transparent" mode="slideover">
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-2" aria-label="Domov">
        <JuhaasLogo />
      </NuxtLink>
    </template>

    <UNavigationMenu :items="navItems" variant="link" color="neutral" />

    <template #right>
      <UTooltip :text="isDark ? 'Switch to Light' : 'Switch to Dark'">
        <UColorModeButton />
      </UTooltip>
      <div
        data-orientation="vertical"
        role="separator"
        data-slot="root"
        class="flex items-center text-center flex-col h-5 w-px bg-(--ui-text) rounded mx-2"
        aria-orientation="vertical"
      ></div>
      <UTooltip text="GitHub">
        <UButton
          :to="githubLink"
          target="_blank"
          variant="ghost"
          color="neutral"
          icon="i-ph-github-logo"
          square
        />
      </UTooltip>
      <UTooltip text="LinkedIn">
        <UButton
          :to="linkedinLink"
          target="_blank"
          variant="ghost"
          color="neutral"
          icon="i-ph-linkedin-logo"
          square
        />
      </UTooltip>
      <UTooltip text="Mail">
        <UButton
          :to="mailLink"
          target="_blank"
          variant="ghost"
          color="neutral"
          icon="i-ph-mailbox"
          square
        />
      </UTooltip>
    </template>

    <template #body>
      <UNavigationMenu :items="navItems" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
