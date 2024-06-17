<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import data from "../data.json";
import router from "../router.js";

const route = useRoute();

const hash = route.hash ? route.hash.substring(1).replace(/%20/g, " ") : "";

const skill = hash ? hash.replace(/-/g, " ") : "";
let index = skill
  ? data.skills.findIndex((s) => s.name.toLowerCase() === skill.toLowerCase())
  : 0;

// If the skill was not found, set the index to 0
index = index === -1 ? 0 : index;
const selected = ref(data.skills[index]);

let dropdown = ref(false);
</script>

<template>
  <div>
    <h1 class="text-5xl font-bold">What do I do?</h1>
    <div class="relative mt-6">
      <div
        class="relative grid grid-cols-[1.25rem_1fr_1.25rem] gap-3 z-10 items-center justify-center px-[0.88rem] py-[0.35rem] bg-yellow text-black rounded-2xl border-black border-2 hover:bg-red dark:border-white xl:hidden"
        @click="dropdown = !dropdown">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          class="w-5"
          v-html="selected.icon" />
        <p>{{ selected.name }}</p>
        <img src="../assets/icons/CaretDown-r.svg" alt="Down" class="w-5" />
      </div>
      <div class="hidden w-full xl:flex flex-row gap-4 mt-3">
        <div
          v-for="skill in data.skills"
          class="chip grid grid-cols-[1.25rem_1fr] gap-3 items-center justify-center w-full min-h-16 px-[0.88rem] py-[0.35rem] text-black border-black dark:border-white border-2 rounded-2xl bg-white dark:bg-blue-light hover:bg-green dark:hover:bg-white cursor-pointer"
          :style="
            selected.name === skill.name ? 'background-color: #f5da6c' : ''
          "
          @click="
            selected = skill;
            router.replace({
              hash: '#' + skill.name.toLowerCase().replace(/ /g, '-'),
            });
          ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            class="w-5"
            v-html="skill.icon" />
          <p class="cursor-pointer">{{ skill.name }}</p>
        </div>
      </div>
      <transition name="fly-fade">
        <div
          v-if="dropdown"
          class="absolute flex flex-col gap-3 top-12 w-full px-[0.88rem] py-4 bg-yellow text-black rounded-2xl border-black border-2 dark:border-white xl:hidden">
          <div
            v-for="skill in data.skills"
            :key="skill.id"
            class="grid grid-cols-[1.25rem_1fr] gap-3 items-center justify-start"
            @click="
              selected = skill;
              dropdown = false;
              router.replace({
                hash: '#' + skill.name.toLowerCase().replace(/ /g, '-'),
              });
            ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              class="w-5"
              v-html="skill.icon" />
            <p>{{ skill.name }}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fly-fade-enter-active,
.fly-fade-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}

.fly-fade-enter,
.fly-fade-leave-to {
  opacity: 0;
  transform: translateY(-10%);
}

.fly-fade-enter-from,
.fly-fade-leave {
  opacity: 0;
  transform: translateY(-20%);
}

.chip {
  transition: background-color 0.5s ease;
}
</style>
