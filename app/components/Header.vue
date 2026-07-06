<script setup lang="ts"></script>

<template>
  <UHeader :toggle="false">
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-2" aria-label="Domov">
        DN Juhaas
      </NuxtLink>
    </template>
    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
</template>

<style scoped></style>
