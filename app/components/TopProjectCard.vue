<script setup lang="ts">
import type { TopProject } from "#shared/types/projects";

const props = defineProps<{
  project: TopProject;
}>();

const NuxtLink = resolveComponent("NuxtLink");
</script>

<template>
  <UCard
    :as="props.project.url ? NuxtLink : 'div'"
    :to="props.project.url"
    class="outline-primary/25 transition hover:bg-elevated/50 focus-visible:outline-3 focus-visible:ring-primary"
  >
    <div class="flex flex-col">
      <div class="flex flex-row justify-between">
        <span class="font-bold">{{ props.project.name }}</span>
        <span class="text-dimmed">
          {{ props.project.totalHours }}h
          <template v-if="props.project.url">
            · {{ props.project.commitsLast7Days }}
            <UIcon name="i-ph-git-commit-bold" class="-mb-0.5" />
          </template>
        </span>
      </div>
      <span v-if="props.project.description" class="text-muted truncate">
        {{ props.project.description }}
      </span>
      <span v-else class="text-dimmed/70 truncate"> no description provided </span>
    </div>
  </UCard>
</template>
