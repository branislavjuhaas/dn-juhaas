<script setup></script>

<template>
  <div
    class="flex flex-col border-b-2 border-black dark:border-white h-14 items-center justify-center px-[20px] cursor-default"
  >
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
</template>

<style scoped></style>
