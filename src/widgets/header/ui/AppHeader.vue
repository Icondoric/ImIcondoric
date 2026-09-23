<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const navLinks = [
  { label: 'INICIO', href: '#inicio' },
  { label: 'SOBRE MÍ', href: '#sobre-mi' },
  { label: 'PORTAFOLIO', href: '#portafolio' },
  { label: 'CONTACTO', href: '#contacto' },
  { label: 'CV', href: '#' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header class="app-header" :class="{ 'header-scrolled': isScrolled }">
    <div class="header-inner">
      <!-- Logo / Brand -->
      <a id="nav-brand" href="#inicio" class="brand">Soy Icondoric</a>

      <!-- Navigation -->
      <nav class="nav-links" role="navigation" aria-label="Navegación principal">
        <a
          v-for="link in navLinks"
          :id="`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`"
          :key="link.label"
          :href="link.href"
          class="nav-link"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.25rem 2rem;
  transition: background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease;
  border-bottom: 1px solid transparent;
}

.header-scrolled {
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: var(--color-border);
}

.header-inner {
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Brand */
.brand {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--color-text-primary);
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.2s ease;
}

.brand:hover {
  color: var(--color-accent-light);
}

/* Nav links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: var(--color-text-secondary);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s ease;
  position: relative;
  padding-bottom: 2px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-accent);
  transition: width 0.25s ease;
}

.nav-link:hover {
  color: var(--color-text-primary);
}

.nav-link:hover::after {
  width: 100%;
}

/* Mobile */
@media (max-width: 640px) {
  .app-header {
    padding: 1rem 1.25rem;
  }
  .nav-links {
    gap: 1rem;
  }
  .nav-link {
    font-size: 0.65rem;
  }
}
</style>
