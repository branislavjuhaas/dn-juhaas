<script setup lang="ts"></script>

<template>
  <UPage class="overflow-hidden">
    <UPageHero
      description="Building scalable web applications, modern cloud infrastructure, and developer tooling. Combining clean architecture with end-to-end technical execution."
      :links="[
        { label: 'Explore projects', icon: 'i-ph-sparkle' },
        { label: 'Contact me', icon: 'i-ph-mailbox', variant: 'outline', color: 'neutral' },
      ]"
      :ui="{ description: 'text-wrap max-w-5xl mx-auto', container: 'pb-16!' }"
    >
      <template #title> Projs </template>
    </UPageHero>
    <div class="w-full relative">
      <Waves />
    </div>
    <UPageSection />
  </UPage>
</template>
