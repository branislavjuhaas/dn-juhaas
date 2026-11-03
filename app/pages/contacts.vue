<script setup lang="ts">
import type { ContactLocation } from "#shared/types/contacts";

const { data: contactsPage } = await useAsyncData("contacts-page", () =>
  queryCollection("contactsPage").first(),
);

const { data: location } = await useFetch<ContactLocation>("/api/contacts");

if (!contactsPage.value || !location.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Contacts could not be loaded",
    fatal: true,
  });
}

useSeoMeta({
  title: contactsPage.value.seo.title,
  ogTitle: contactsPage.value.seo.title,
  description: contactsPage.value.seo.description,
  ogDescription: contactsPage.value.seo.description,
});
</script>

<template>
  <UPage v-if="contactsPage && location">
    <UPageHero
      orientation="horizontal"
      :ui="{ title: 'max-lg:text-center', container: 'pb-16!', root: 'pb-20' }"
    >
      <template #title>
        <div class="tracking-tight animate-fade-up" style="--delay: 150ms">
          {{ contactsPage.hero.title }}<br />
          <span class="text-primary">{{ contactsPage.hero.titleAccent }}</span>
        </div>
      </template>
      <div
        class="flex flex-col w-full items-center justify-center gap-8 lg:h-50 animate-fade-up"
        style="--delay: 250ms"
      >
        <div class="grid grid-cols-2 gap-7 mt-4">
          <Stat
            :icon="contactsPage.stats.location.icon"
            :fact="location.place"
            :label="`${contactsPage.stats.location.label}: ${location.place}`"
          />
          <Stat
            :icon="contactsPage.stats.time.icon"
            :fact="location.time"
            :unit="location.timezoneAbbreviation"
            :label="`${contactsPage.stats.time.label}: ${location.time} ${location.timezoneAbbreviation}`"
          />
        </div>
      </div>
      <template #bottom>
        <UContainer>
          <ul
            role="list"
            class="flex flex-wrap justify-center gap-8 animate-fade-in"
            style="--delay: 400ms; --duration: 1.4s"
          >
            <ContactCard v-for="contact in contactsPage.links" :key="contact.to" v-bind="contact" />
          </ul>
        </UContainer>
      </template>
    </UPageHero>
  </UPage>
</template>
