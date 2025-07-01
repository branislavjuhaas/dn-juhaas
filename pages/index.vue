<template>
  <div class="flex flex-col h-full justify-between relative">
    <div class="flex flex-col">
      <div class="flex flex-col sm:flex-row text-nowrap">
        <h1 class="font-normal!">I'm Branislav&nbsp;</h1>
        <h1>&rarr; Developer</h1>
      </div>
      <p class="ml-0.75">
        The best brainfuck developer on the planet with 1000+ projects
      </p>
      <div class="flex flex-row gap-3 mt-2 max-w-fill">
        <ContentButton
          to="/skills"
          text="My skills"
          icon="ph:lightning-fill"
          accent />
        <ContentButton
          to="/portfolio"
          text="Portfolio"
          icon="ph:flag-banner-fold-fill" />
        <ContentButton to="/about" text="Learn more" icon="ph:signpost-fill" />
      </div>
    </div>
    <div class="w-full md:w-fit flex flex-col items-center">
      <div
        class="mb-14 max-md:bg-peach px-4 py-2 border-2 rounded-2xl md:p-0 md:rounded-none md:border-0 flex flex-row gap-8">
        <a
          class="social-link"
          :href="$config.public.githubUrl"
          target="_blank"
          rel="noopener noreferrer">
          <Icon name="ph:github-logo" />
          GitHub
        </a>
        <a
          class="social-link"
          :href="$config.public.linkedinUrl"
          target="_blank"
          rel="noopener noreferrer">
          <Icon name="ph:linkedin-logo" />
          LinkedIn
        </a>
      </div>
    </div>
    <img
      src="./../assets/images/juhaas.webp"
      alt="Branislav's photo"
      class="absolute w-125 h-125 right-1/2 max-md:translate-x-3/5 bottom-0 md:right-0 -z-10 object-cover" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "minimal",
});
</script>

<style scoped>
@reference "./../assets/css/main.css";

.social-link {
  @apply flex flex-row gap-2 items-center hover:text-ocean;
}
</style>
