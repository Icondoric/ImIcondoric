<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer" id="footer">
    <p class="footer-text">
      <em>&copy; {{ year }} Ivan Condori Choquehuanca (Icondoric)</em>
    </p>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid var(--color-border);
  padding: 2rem 1.5rem;
  text-align: center;
}

.footer-text {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  letter-spacing: 0.02em;
}
</style>
