<script setup>
import { onMounted } from "vue";
import data from "../data.json";

onMounted(() => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${0.1 * index}s`;
    card.style.animationDelay = `${0.1 * index}s`;
  });
});
</script>

<template>
  <div>
    <h1 class="text-5xl font-bold">Contact</h1>
    <div class="flex flex-col gap-3.5 mt-6">
      <a
        v-for="contact in data.contacts"
        :href="contact.link"
        class="card opacity-0 grid grid-cols-[1.25rem_1fr] grid-rows-2 bg-white border-black border-2 rounded-2xl text-black px-[0.88rem] pt-[0.35rem] pb-2 gap-y-3 items-center gap-3 duration-300 hover:bg-green dark:bg-blue-light dark:border-white dark:hover:bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          class="w-5"
          v-html="contact.icon" />
        <h6 class="text-base font-bold row-start-1 col-start-2">
          {{ contact.name }}
        </h6>
        <p class="text-base row-start-2 col-span-3">{{ contact.value }}</p>
      </a>
    </div>
  </div>
</template>

<style scoped>
.card {
  animation: card 0.5s ease forwards;
}

@keyframes card {
  0% {
    transform: translateY(30%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
</style>
