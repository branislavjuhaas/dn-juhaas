<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtAnnouncer />
    <NuxtLoadingIndicator color="var(--ui-primary)" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.15s ease-out,
    transform 0.15s cubic-bezier(0.25, 1, 0.5, 1);
}

.page-enter-from {
  opacity: 0;
  transform: scale(0.99);
}

.page-leave-to {
  opacity: 0;
  transform: scale(1.01);
}

.layout-enter-active,
.layout-leave-active {
  transition:
    opacity 0.15s ease-out,
    transform 0.15s cubic-bezier(0.25, 1, 0.5, 1);
}

.layout-enter-from {
  opacity: 0;
  transform: scale(0.99);
}

.layout-leave-to {
  opacity: 0;
  transform: scale(1.01);
}
</style>
