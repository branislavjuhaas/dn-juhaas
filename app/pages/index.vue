<script setup lang="ts">
// useHead({
//   titleTemplate: "Branislav Juhás",
// });

useSeoMeta({
  titleTemplate: "Branislav Juhás",
  ogTitle: "Branislav Juhás",
  description:
    "Architect & developer building scalable web applications, modern cloud infrastructure, and developer tooling. Combining clean architecture with end-to-end technical execution.",
  ogDescription:
    "Architect & developer building scalable web applications, modern cloud infrastructure, and developer tooling. Combining clean architecture with end-to-end technical execution.",
});
</script>

<template>
  <UPage class="overflow-hidden">
    <UPageHero
      description="Building scalable web applications, modern cloud infrastructure, and developer tooling. Combining clean architecture with end-to-end technical execution."
      :links="[
        { label: 'Explore projects', icon: 'i-ph-sparkle', to: '/projects' },
        {
          label: 'Contact me',
          icon: 'i-ph-mailbox',
          variant: 'outline',
          color: 'neutral',
          to: '/contacts',
        },
      ]"
      :ui="{ description: 'text-wrap max-w-5xl mx-auto', container: 'pb-16!' }"
    >
      <template #title>
        Architect's Strategy,<br /><span class="text-primary">Developer's Execution</span>
      </template>
    </UPageHero>
    <div class="w-full relative">
      <Waves />
    </div>
    <UPageSection />
  </UPage>
</template>
