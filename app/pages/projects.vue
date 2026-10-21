<script setup lang="ts">
const { data: projects, error } = await useFetch("/api/projects");

if (error.value || !projects.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Projects could not be loaded",
    fatal: true,
  });
}

useSeoMeta({
  title: "Projects",
  ogTitle: "Projects",
  description:
    "Discover recent full-stack applications, cloud projects, and open-source tools by Branislav Juhás. Check out live builds, project specs, and recent code.",
  ogDescription:
    "Discover recent full-stack applications, cloud projects, and open-source tools by Branislav Juhás. Check out live builds, project specs, and recent code.",
});
</script>

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
          <Stat icon="i-ph-git-merge-fill" :fact="projects.commits.toString()" unit="commits" />
          <Stat icon="i-ph-gauge-fill" :fact="projects.minutes.toString()" unit="minutes" />
          <Stat icon="i-ph-swatches-fill" :fact="projects.projects.toString()" unit="projects" />
        </div>
        <span class="text-base text-muted">
          {{
            projects.minutes > 360 ? "Not bad for a week's work" : "Even I had to touch a grass"
          }}</span
        >
      </div>
      <template #bottom>
        <UContainer>
          <UPageGrid class="animate-fade-in" style="--delay: 400ms; --duration: 1.4s">
            <UCard v-for="project in projects.topProjects">
              <div class="flex flex-col">
                <div class="flex flex-row justify-between">
                  <span class="font-bold">{{ project.name }}</span>
                  <span class="text-dimmed">
                    {{ project.totalHours }}h
                    <template v-if="project.description">
                      · {{ project.commitsLast7Days }}
                      <UIcon name="i-ph-git-commit-bold" class="-mb-0.5" />
                    </template>
                  </span>
                </div>
                <span v-if="project.description" class="text-muted truncate">
                  {{ project.description }}
                </span>
                <span v-else class="text-dimmed/70 truncate"> no description provided </span>
              </div>
            </UCard>
          </UPageGrid>
        </UContainer>
      </template>
    </UPageHero>
  </UPage>
</template>
