<script setup>
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="grid grid-cols-1 grid-rows-[1fr_auto] w-full h-full">
    <div class="flex flex-col items-center px-[20px]">
      <router-view
        class="max-w-[1440px] pt-[10rem] h-full w-full overflow-hidden"
      />
    </div>
    <Footer />
  </div>
</template>

<style scoped></style>
