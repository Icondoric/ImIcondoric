<script setup lang="ts">
import HomePage from '@pages/home/ui/HomePage.vue'
import ConstellationCanvas from '@features/constellation-bg/ui/ConstellationCanvas.vue'
</script>

<template>
  <div class="app-root">
    <ConstellationCanvas />
    <div class="app-content">
      <HomePage />
    </div>
  </div>
</template>

<style scoped>
.app-root {
  position: relative;
  min-height: 100vh;
}

.app-content {
  position: relative;
  z-index: 1;
}
</style>
