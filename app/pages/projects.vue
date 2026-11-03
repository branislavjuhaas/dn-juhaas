<script setup lang="ts">
const { data: stats, error: statsError } = await useFetch("/api/projects");
const { data: contributions, error: contributionsError } = await useFetch("/api/contributions");

const { data: projectsPage } = await useAsyncData("projects-page", () =>
  queryCollection("projectsPage").first(),
);
const { data: featuredProjects } = await useAsyncData("featured-projects", () =>
  queryCollection("projects").all(),
);

if (
  statsError.value ||
  !stats.value ||
  contributionsError.value ||
  !contributions.value ||
  !projectsPage.value ||
  !featuredProjects.value
) {
  throw createError({
    statusCode: 404,
    statusMessage: "Projects could not be loaded",
    fatal: true,
  });
}

useSeoMeta({
  title: projectsPage.value.seo.title,
  ogTitle: projectsPage.value.seo.title,
  description: projectsPage.value.seo.description,
  ogDescription: projectsPage.value.seo.description,
});
</script>

<template>
  <UPage v-if="projectsPage && stats && contributions && featuredProjects">
    <UPageHero
      orientation="horizontal"
      :ui="{ title: 'max-lg:text-center', container: 'pb-16!', root: 'pb-20' }"
    >
      <template #title>
        <div class="tracking-tight animate-fade-up" style="--delay: 150ms">
          {{ projectsPage.hero.title }}<br />
          <span class="text-primary">{{ projectsPage.hero.titleAccent }}</span>
        </div>
      </template>
      <div
        class="flex flex-col w-full items-center justify-center gap-8 lg:h-50 animate-fade-up"
        style="--delay: 250ms"
      >
        <div class="grid grid-cols-3 gap-7 mt-4">
          <Stat
            v-for="stat in projectsPage.stats"
            :key="stat.key"
            :icon="stat.icon"
            :fact="(stats[stat.key] ?? 0).toString()"
            :unit="stat.unit"
          />
        </div>
        <span class="text-base text-muted">
          {{
            stats.minutes > 360 ? projectsPage.statsMessage.working : projectsPage.statsMessage.idle
          }}
        </span>
      </div>
      <template #bottom>
        <UContainer>
          <UPageGrid class="animate-fade-in" style="--delay: 400ms; --duration: 1.4s">
            <TopProjectCard
              v-for="project in stats.topProjects"
              :key="project.name"
              :project="project"
            />
          </UPageGrid>
        </UContainer>
      </template>
    </UPageHero>
    <USeparator class="animate-fade-in" style="--delay: 700ms; --duration: 1.4s" />
    <UPageSection
      :title="projectsPage.sections.featured.title"
      class="animate-fade-in"
      style="--delay: 700ms; --duration: 1.4s"
    >
      <UPageGrid>
        <UPageCard
          v-for="project in featuredProjects"
          :key="project.path"
          :to="project.path"
          :title="project.title"
          :description="project.description"
          reverse
        />
      </UPageGrid>
    </UPageSection>
    <USeparator class="animate-fade-in" style="--delay: 1000ms; --duration: 1.4s" />
    <UPageSection
      :title="projectsPage.sections.contributions.title"
      class="animate-fade-in"
      style="--delay: 1000ms; --duration: 1.4s"
    >
      <UPageGrid>
        <ContributionCard
          v-for="contribution in contributions"
          :key="contribution.repository"
          :contribution="contribution"
        />
      </UPageGrid>
    </UPageSection>
  </UPage>
</template>
