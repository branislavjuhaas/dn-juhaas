<template>
  <div>
    <header
      class="fixed top-0 left-0 w-full h-16 px-5 bg-white flex items-center border-b-2 z-20">
      <div
        class="flex flex-row items-center justify-between w-full max-w-content mx-auto gap-4">
        <NuxtLink
          :to="$localePath('/')"
          class="uppercase font-bold text-ebony hover:text-ocean transition-colors duration-200">
          <span class="max-[400px]:hidden">Branislav</span>
          Juhaas
        </NuxtLink>
        <nav>
          <ul class="flex space-x-2 uppercase nav-list">
            <li>
              <NuxtLink :to="$localePath('portfolio')" class="nav-link">
                {{ $t("header.portfolio") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="$localePath('skills')" class="nav-link">
                {{ $t("header.skills") }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="$localePath('about')" class="nav-link">
                {{ $t("header.about") }}
              </NuxtLink>
            </li>
            <li class="max-[420px]:hidden flex items-center gap-1">
              <template v-for="(locale, index) in locales">
                <span v-if="index > 0">/</span>
                <NuxtLink
                  :to="$switchLocalePath(locale.code)"
                  class="social-link">
                  {{ locale.code.substring(0, 2) }}
                </NuxtLink>
              </template>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { locales } = useI18n();
</script>

<style scoped>
@reference "./../assets/css/main.css";

.nav-link {
  @apply text-ebony hover:text-ocean transition-colors duration-200 cursor-pointer;
}

.nav-list li:not(:first-child)::before {
  content: "|";
  color: var(--color-ebony);
  margin-right: 0.5rem;
}

.router-link-active {
  @apply font-bold;
}
</style>
