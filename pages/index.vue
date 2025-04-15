<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold mb-4">QR Code Scanner</h1>
    <div class="w-48 h-48 rounded-lg shadow-lg overflow-hidden mx-6">
      <QrcodeStream
        class="w-full aspect-square rounded-xl"
        @error="onError"
        @detect="onDetect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const toast = useToast();
onMounted(() => {
  // Check if the device supports camera
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    toast.add({
      title: "Appareil photo non pris en charge",
      duration: 3000,
    });
  }
});

function onDetect(detectedCodes: DetectedBarcode[]) {
  if (detectedCodes.length > 0) {
    const qrCodeValue = detectedCodes[0].rawValue;
    navigateTo(`/qrcode-value?qrcode=${encodeURIComponent(qrCodeValue)}`);
  }
}

function onError(err: Error) {
  console.error(err);
  toast.add({
    title: "Erreur de lecture du QR Code",
    duration: 3000,
    icon: "memory:alert",
  });
}
</script>
