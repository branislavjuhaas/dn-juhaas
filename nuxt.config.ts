// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@nuxt/content", "motion-v/nuxt", "nuxt-studio"],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: "utf-8",
      title: "Strategic Engineer",
      titleTemplate: "%s | Branislav Juhás",
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
  },

  motionV: {
    directives: true,
  },

  studio: {
    repository: {
      provider: "github",
      owner: "branislavjuhaas",
      repo: "dn-juhaas",
      branch: "v3",
    },
    route: "/admin",
    editor: {
      iconLibraries: ["ph"],
    },
    git: {
      commit: {
        messagePrefix: "feat:",
      },
    },
  },

  nitro: {
    storage: {
      cache: {
        driver: "cloudflare-kv-binding",
        binding: "CACHE",
      },
    },
  },
});
