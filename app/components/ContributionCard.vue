<script setup lang="ts">
import type { Contribution } from "#shared/types/contributions";

const props = defineProps<{
  contribution: Contribution;
}>();

const NuxtLink = resolveComponent("NuxtLink");
</script>

<template>
  <UCard
    :as="NuxtLink"
    :to="props.contribution.url"
    class="outline-primary/25 transition hover:bg-elevated/50 focus-visible:outline-3 focus-visible:ring-primary"
  >
    <div class="flex flex-col">
      <div class="grid grid-cols-[1fr_auto] gap-6">
        <span class="font-bold inline-flex items-baseline min-w-0 max-w-full">
          <span class="text-dimmed truncate min-w-0 shrink">{{ props.contribution.owner }}</span>
          <span class="shrink-0">/{{ props.contribution.name }}</span>
        </span>
        <span class="text-dimmed w-max">
          {{ props.contribution.firstCommitYear }}
          <template v-if="props.contribution.firstCommitYear != props.contribution.lastCommitYear">
            - {{ props.contribution.lastCommitYear }}
          </template>
        </span>
      </div>
      <span v-if="props.contribution.description" class="text-muted truncate">
        {{ props.contribution.description }}
      </span>
      <span v-else class="text-dimmed/70 truncate"> no description provided </span>
    </div>
  </UCard>
</template>
