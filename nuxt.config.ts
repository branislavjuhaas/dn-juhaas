// https://nuxt.com/docs/api/configuration/nuxt-config
const env = (
  globalThis as typeof globalThis & {
    process: { env: Record<string, string | undefined> };
  }
).process.env;

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "motion-v/nuxt"],
  css: ["~/assets/css/main.css"],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      charset: "utf-8",
      titleTemplate: "%s | Branislav Juhás",
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:image", content: "https://juhaas.dev/opengraph.png" },
      ],
      htmlAttrs: {
        lang: "en-US",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  runtimeConfig: {
    public: {
      commitSha: env.WORKERS_CI_COMMIT_SHA?.slice(0, 7) || "d1n2j7u",
    },
  },
});
