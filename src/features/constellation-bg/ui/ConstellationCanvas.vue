<script setup lang="ts">
import { ref } from 'vue'
import { useConstellation } from '../model/useConstellation'

const canvasRef = ref<HTMLCanvasElement | null>(null)
useConstellation(canvasRef)
</script>

<template>
  <canvas ref="canvasRef" class="constellation-canvas" aria-hidden="true" />
</template>

<style scoped>
.constellation-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.7;
}
</style>
