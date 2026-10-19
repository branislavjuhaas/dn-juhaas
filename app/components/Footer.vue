<script setup lang="ts">
const config = useRuntimeConfig();
const gitHash = config.public.commitSha;
</script>

<template>
  <UFooter>
    <template #left>
      <span class="text-muted text-sm">Copyright © 2024 - 2026 Branislav Juhás</span>
    </template>
    <template #right>
      <div class="flex items-center gap-2">
        <UButton
          :label="gitHash"
          to="https://github.com/branislavjuhaas/dn-juhaas"
          trailing-icon="i-ph-github-logo"
          color="neutral"
          variant="outline"
          size="sm"
          target="_blank"
        />
        <UButton label="All operational" color="success" variant="subtle" size="sm" class="gap-2">
          <template #trailing>
            <span class="relative flex size-3">
              <span
                class="absolute inline-flex size-full animate-ping rounded-full opacity-75 bg-success"
              />
              <span class="relative inline-flex size-3 scale-90 rounded-full bg-success" />
            </span>
          </template>
        </UButton>
      </div>
    </template>
  </UFooter>
</template>
