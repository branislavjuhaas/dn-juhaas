<script setup lang="ts"></script>

<template>
  <UPage>
    <UPageHero orientation="horizontal" :ui="{ title: 'max-lg:text-center', container: 'pb-16!' }">
      <template #title>
        <div class="tracking-tight animate-fade-up" style="--delay: 150ms">
          Cooking the<br />
          <span class="text-primary">Next Big Thing!</span>
        </div>
      </template>
      <div
        class="flex flex-col w-full items-center justify-center gap-8 lg:h-50 animate-fade-up"
        style="--delay: 250ms"
      >
        <div class="grid grid-cols-3 gap-7 mt-4">
          <Stat icon="i-ph-git-merge-fill" fact="55" unit="commits" />
          <Stat icon="i-ph-gauge-fill" fact="1079" unit="minutes" />
          <Stat icon="i-ph-swatches-fill" fact="5" unit="projects" />
        </div>
        <span class="text-base text-muted">Not bad for a week's work</span>
      </div>
      <template #bottom>
        <UContainer>
          <UPageGrid class="animate-fade-in" style="--delay: 400ms; --duration: 1.4s">
            <UCard>Hello</UCard>
            <UCard>Hello</UCard>
            <UCard>Hello</UCard>
          </UPageGrid>
        </UContainer>
      </template>
    </UPageHero>
  </UPage>
</template>
