<template>
  <div class="h-screen flex flex-col items-center justify-center m-4">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin" class="flex flex-col mt-4">
      <UInput
        type="text"
        color="neutral"
        size="xl"
        placeholder="Nom d'utilisateur"
        v-model="username"
        trailing-icon="i-lucide-user"
        required
      >
      </UInput>
      <UInput
        class="mt-4"
        color="neutral"
        size="xl"
        v-model="password"
        placeholder="Mot de passe"
        :type="show ? 'text' : 'password'"
        required
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="show ? 'Hide password' : 'Show password'"
            :aria-pressed="show"
            aria-controls="password"
            @click="show = !show"
            class="p-0"
          />
        </template>
      </UInput>
      <div class="flex flex-col items-center mt-4">
        <UButton
          color="neutral"
          variant="outline"
          :disabled="!username || !password"
          @click="handleLogin"
        >
          Login
        </UButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const toast = useToast();

const username = ref("");
const password = ref("");
const show = ref(false);

import { KuzzleApi } from "@/api/kuzzle";

const nuxtApp = useNuxtApp();
const kuzzleApi = nuxtApp.$kuzzleApi as KuzzleApi;

const handleLogin = async () => {
  if (!username.value || !password.value) {
    return;
  }

  try {
    const response = await kuzzleApi.login(username.value, password.value);
    console.log(JSON.stringify(response));

    localStorage.setItem("jwt", response);

    toast.add({
      title: "Connexion réussie",
      description: "Vous êtes maintenant connecté.",
      duration: 3000,
    });

    navigateTo("/");
  } catch (error: any) {
    console.error("Login failed:", error);

    let description = error.message
      .replace(
        "wrong username or password",
        "Nom d'utilisateur ou mot de passe incorrect"
      )
      .replace("Login failed", "Échec de la connexion");

    toast.add({
      title: "Erreur de connexion",
      description,
      duration: 3000,
      icon: "memory:alert",
    });
  }
};
</script>
