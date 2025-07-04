// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
  ],
  css: ["~/assets/css/main.css"],
  app: {
    pageTransition: { name: "slide-fade", mode: "out-in" },
    layoutTransition: { name: "fade", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      titleTemplate: "%s | Branislav Juhaas",
      title: "Branislav Juhaas",
    },
  },
  runtimeConfig: {
    public: {
      yearsOfExperience: Math.floor(
        (new Date().getTime() - new Date("2022-05-01").getTime()) /
          (1000 * 60 * 60 * 24 * 365.25),
      ),
    },
  },
  fonts: {
    defaults: {
      weights: [400, 700],
      styles: ["normal", "italic"],
      subsets: ["latin"],
    },
    provider: "google",
    families: [
      {
        name: "Space Mono",
        weights: [400, 700],
        styles: ["normal", "italic"],
        subsets: ["latin"],
        preload: true,
        provider: "google",
      },
    ],
  },
  content: {
    preview: {
      api: "https://api.nuxt.studio",
      gitInfo: {
        name: "dn-juhaas",
        owner: "branislavjuhaas",
        url: "https://github.com/branislavjuhaas/dn-juhaas",
      },
    },
  },
});
