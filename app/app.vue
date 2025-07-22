<template>
  <div class="flex flex-col w-full overflow-x-hidden">
    <main class="flex flex-col w-full h-full px-5 items-center">
      <div class="flex flex-col max-w-content w-full h-full pt-50 gap-16">
        <NuxtLayout>
          <NuxtPage
            :transition="{
              name: 'fade',
              mode: 'out-in',
              onBeforeEnter,
            }" />
        </NuxtLayout>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { finalizePendingLocaleChange } = useI18n();

const onBeforeEnter = async () => {
  await finalizePendingLocaleChange();
};

await finalizePendingLocaleChange();
</script>

<style scoped>
/* .slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    transform 0.21s,
    opacity 0.21s ease;
  position: relative;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(5%);
}
.slide-fade-enter-from,
.slide-fade-leave {
  opacity: 0;
  transform: translateY(0%);
} */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.21s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-from,
.fade-leave {
  opacity: 0;
}
</style>
