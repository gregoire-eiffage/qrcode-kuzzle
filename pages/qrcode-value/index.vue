<template>
  <div class="flex flex-col items-center justify-center h-screen m-4 relative">
    <h1 class="text-3xl font-bold mb-4">QR Code Scanner</h1>
    <div class="w-full max-w-md p-4 bg-white rounded-lg">
      <p class="text-lg font-semibold text-black mb-2">{{ qrCodeValue }}</p>
    </div>
    <!-- back to qr code scanner -->
    <div class="absolute bottom-6 w-full text-center">
      <nuxt-link to="/" class="text-gray-500 hover:underline">
        Back to QR Code Scanner
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const qrCodeValue = ref("");

onMounted(() => {
  qrCodeValue.value = route.query.qrcode as string;
});
</script>
