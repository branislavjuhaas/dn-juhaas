<script setup>
import { ref, onMounted } from "vue";
import skills from "../data.json";

let currentSkill = ref(skills.skills[0]);
let index = 0;

onMounted(() => {
  setInterval(() => {
    index = (index + 1) % skills.skills.length;
    currentSkill.value = skills.skills[index];
  }, 5000);
});
</script>

<template>
  <div class="relative">
    <div class="relative text-5xl flex flex-row flex-wrap">
      <h1 class="">I am Branislav&nbsp;</h1>
      <div class="flex flex-row">
        <h1>->&nbsp;</h1>
        <div class="relative w-96">
          <transition name="fly">
            <b :key="index" class="absolute">{{ currentSkill.me }}!</b>
          </transition>
        </div>
      </div>
    </div>
    <div class="mt-2 relative">
      <transition name="fade">
        <h2 :key="index" class="text-xl">
          {{ currentSkill.note }}
        </h2>
      </transition>
    </div>
    <div class="flex flex-row gap-4 mt-3">
      <router-link class="home-link bg-yellow hover:bg-red" to="/me">
        <img src="../assets/icons/Signpost-f.svg" />
        Learn more
      </router-link>
      <router-link
        class="home-link bg-white dark:bg-blue-light hover:bg-green dark:hover:bg-white"
        to="/skills">
        <img src="../assets/icons/Lightning-f.svg" />
        Explore skills
      </router-link>
      <router-link
        class="home-link bg-white dark:bg-blue-light hover:bg-green dark:hover:bg-white"
        to="/contact">
        <img src="../assets/icons/ChatCircleText-f.svg" />
        Contact now
      </router-link>
    </div>
    <img
      src="/src/assets/mellanium.png"
      alt="Mellanium"
      class="mellanium absolute right-0 bottom-[calc(-50vh+30%)] w-[46rem] -z-10 sm:bottom-[-25rem] lg:max-w-[60%]" />
  </div>
</template>

<style scoped>
.fly-enter-active,
.fly-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}
.fly-enter,
.fly-leave-to {
  opacity: 0;
  transform: translateX(10%);
}
.fly-enter-from,
.fly-leave {
  opacity: 0;
  transform: translateX(-20%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  position: absolute;
}
.fade-enter-from,
.fade-leave {
  opacity: 0;
  position: absolute;
}

.home-link {
  @apply w-[14rem] px-[0.88rem] py-[0.35] grid grid-cols-[1.25rem_1fr] text-base text-black border-black dark:border-white border-2 rounded-2xl p-1 items-center gap-3 duration-300;
}

@media (min-width: 720px) {
  .fly-enter,
  .fly-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
  .fly-enter-from,
  .fly-leave {
    opacity: 0;
    transform: translateY(-100%);
  }
}

@media (max-height: 720px) {
  .mellanium {
    width: initial;
    max-height: 150dvh;
    bottom: -55dvh;
  }
}
</style>
