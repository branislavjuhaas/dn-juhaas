<script setup></script>

<template>
  <div
    class="flex flex-col border-t-2 border-black dark:border-white h-14 items-center px-[20px]">
    <div
      class="flex flex-col justify-center items-center max-w-[1440px] h-full w-full sm:grid sm:grid-cols-[auto_1fr_auto]">
      <router-link to="/" class="font-bold text-xl">
        BRANISLAV JUHÁS
      </router-link>
      <div class="col-start-3 text-base hidden sm:flex cursor-default">
        <p>
          <router-link
            exact
            class="duration-300 hover:text-blue-dark dark:hover:text-blue-light"
            to="/">
            Home
          </router-link>
          |
          <router-link
            exact
            class="duration-300 hover:text-blue-dark dark:hover:text-blue-light"
            to="/skills">
            Skills
          </router-link>
          |
          <router-link
            exact
            class="duration-300 hover:text-blue-dark dark:hover:text-blue-light"
            to="/dn">
            DN Family
          </router-link>
          |
          <router-link
            exact
            class="duration-300 hover:text-blue-dark dark:hover:text-blue-light"
            to="/contact">
            Contact
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply font-bold text-black dark:text-white;
}
</style>
