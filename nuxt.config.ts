// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "nuxt-qrcode",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
  ],
  css: ["~/assets/css/main.css"],
  qrcode: {
    options: {
      variant: "pixelated",
      // OR
      // variant: {
      //   inner: "circle",
      //   marker: "rounded",
      //   pixel: "rounded",
      // },
      radius: 1,
      blackColor: "var(--ui-text-highlighted)", // 'var(--ui-text-highlighted)' if you are using `@nuxt/ui` v3
      whiteColor: "var(--ui-bg)",
    },
  },
  runtimeConfig: {
    secret: process.env.SECRET,
    public: {
      kuzzleHost: process.env.KUZZLE_HOST,
      kuzzlePort: process.env.KUZZLE_PORT,
      kuzzleLocal: process.env.KUZZLE_LOCAL,
      kuzzleSSL: process.env.KUZZLE_SSL,
    },
  },
});
