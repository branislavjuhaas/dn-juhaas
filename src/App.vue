<!--suppress CssUnusedSymbol -->
<script setup>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <div
    class="grid grid-cols-1 grid-rows-[auto_1fr_auto] w-full h-full sm:grid-rows-[1fr_auto]">
    <Header class="sm:hidden" />
    <div class="flex flex-col items-center px-[20px] overflow-hidden">
      <router-view
        v-slot="{ Component }"
        class="max-w-[1440px] pt-[10rem] h-full w-full overflow-hidden relative">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    transform 0.21s,
    opacity 0.21s ease;
  position: relative;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(10%);
}
.slide-fade-enter-from,
.slide-fade-leave {
  opacity: 0;
  transform: translateY(0%);
}
</style>
