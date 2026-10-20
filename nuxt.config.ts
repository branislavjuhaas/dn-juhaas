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

  routeRules: {
    "/": { prerender: true },
  },

  nitro: {
    preset: "cloudflare_module",
    storage: {
      cache: {
        driver: "cloudflare-kv-binding",
        binding: "CACHE",
      },
      kv: {
        driver: "cloudflare-kv-binding",
        binding: "KV",
      },
    },
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
    head: {
      charset: "utf-8",
      titleTemplate: "%s | Branislav Juhás",
      meta: [
        { property: "og:image", content: "https://juhaas.dev/opengraph.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:type", content: "image/png" },
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

  icon: {
    clientBundle: {
      scan: true,
      icons: ["ph:moon", "ph:sun", "ph:list"],
    },
    serverBundle: false,
  },
});
