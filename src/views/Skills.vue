<script setup>
import { ref } from "vue";
import data from "../data.json";

const selected = ref(0);
</script>

<template>
  <div>
    <h1 class="text-5xl font-bold">What do I do?</h1>
    <div class="">
      <div
        class="bg-yellow h-10 grid-cols-[1.25rem_1fr_1.25rem] rounded-2xl"></div>
    </div>
  </div>
</template>

<style scoped>
#scroller {
  scrollbar-width: none;
}
</style>
