<script setup></script>

<template>
  <div
    class="flex flex-col border-t-2 border-black dark:border-white h-14 items-center px-[20px]"
  >
    <div
      class="grid grid-cols-[auto_1fr_auto] max-w-[1440px] h-full w-full content-center"
    >
      <router-link to="/" class="font-bold italic text-xl"
        >Branislav Juhás</router-link
      >
      <div class="col-start-3 text-base">
        <p>
          <router-link class="duration-300 hover:text-blue-light" to="/"
            >Home</router-link
          >
          |
          <router-link class="duration-300 hover:text-blue-light" to="/skills"
            >Skills</router-link
          >
          |
          <router-link class="duration-300 hover:text-blue-light" to="/dn"
            >DN Family</router-link
          >
          |
          <router-link class="duration-300 hover:text-blue-light" to="/contact"
            >Contact</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
