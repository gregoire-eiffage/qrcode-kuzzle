import { defineNuxtPlugin } from "nuxt/app";
import { KuzzleApi } from "@/api/kuzzle";

export default defineNuxtPlugin(async (nuxtApp) => {
  console.log("test plugin");

  const kuzzleApi = new KuzzleApi();
  await kuzzleApi.connect();
  nuxtApp.provide("kuzzleApi", kuzzleApi);
});
