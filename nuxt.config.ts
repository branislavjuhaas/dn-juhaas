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
    "@nuxtjs/i18n",
  ],
  css: ["~/assets/css/main.css"],
  app: {
    layoutTransition: { name: "fade", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      titleTemplate: "%s | Branislav Juhaas",
      title: "DN",
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
    watch: {
      enabled: true,
      port: 4000,
      showURL: false,
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json", language: "en-US" },
      { code: "sk", name: "Slovak", file: "sk.json", language: "sk-SK" },
    ],
    baseUrl: "https://juhaas.eu",
    skipSettingLocaleOnNavigate: true,
  },
});
