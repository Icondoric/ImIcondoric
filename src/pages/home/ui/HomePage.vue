<script setup lang="ts">
import AppHeader from '@widgets/header/ui/AppHeader.vue'
import HeroSection from '@widgets/hero/ui/HeroSection.vue'
import PortfolioSection from '@widgets/portfolio/ui/PortfolioSection.vue'
import AppFooter from '@widgets/footer/ui/AppFooter.vue'
</script>

<template>
  <div class="home-page">
    <AppHeader />

    <main>
      <HeroSection />
      <PortfolioSection />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
