<!--suppress CssUnusedSymbol -->
<script setup>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <Header class="sm:hidden" />
    <div
      class="flex flex-col w-full h-full items-center px-[20px] overflow-hidden">
      <router-view
        v-slot="{ Component }"
        class="max-w-[1440px] pt-[9.5rem] h-full pb-14 w-full overflow-hidden relative sm:pt-[10rem]">
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
