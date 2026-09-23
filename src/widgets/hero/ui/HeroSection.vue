<script setup lang="ts">
import SocialIcon from '@shared/ui/SocialIcon.vue'
</script>

<template>
  <section id="inicio" class="hero-section">
    <!-- Avatar -->
    <div class="avatar-wrapper animate-fade-up">
      <div id="hero-avatar" class="avatar-container glow-pulse">
        <img
          src="/me2.png"
          alt="Ivan Condori Choquehuanca"
          class="avatar-image"
          fetchpriority="high"
          decoding="async"
        />
      </div>
    </div>

    <!-- Name & Role -->
    <div class="hero-text">
      <h1 class="hero-brand animate-fade-up-delay-1">Icondoric</h1>
      <p class="hero-fullname animate-fade-up-delay-2">Ivan Condori Choquehuanca</p>
      <p class="hero-roles animate-fade-up-delay-3">
        Ingeniero de Sistemas, Desarrollador de Software &amp; Creador de Contenido
      </p>
    </div>

    <!-- Social Icons -->
    <div class="hero-socials animate-fade-up-delay-4">
      <SocialIcon />
    </div>

    <!-- Sobre mí: anchor separado del card para compensar el header fijo -->
    <span id="sobre-mi" class="sobre-mi-anchor" aria-hidden="true" />

    <!-- Sobre mí: encabezado al estilo de PortfolioSection -->
    <div class="sobre-mi-header animate-fade-up-delay-5">
      <h2 class="sobre-mi-title"># Sobre mí</h2>
      <p class="sobre-mi-subtitle">## Quién soy</p>
      <div class="sobre-mi-divider" />
    </div>

    <!-- Bio -->
    <div class="hero-bio animate-fade-up-delay-5">
      <p>
        <strong>
          ¡Hola! Soy Icondoric de La Paz, Bolivia.
          Me apasiona la creación de contenido, el gimnasio, la música y el desarrollo de software.
          ¡Siéntete libre de ponerte en contacto o revisar mis proyectos a continuación!
        </strong>
      </p>
    </div>
  </section>
</template>

<style scoped>

.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem 1.5rem 4rem;
  gap: 1.75rem;
}

/* Avatar */
.avatar-wrapper {
  margin-top: 3rem;
  margin-bottom: 1rem;
}

.avatar-container {
  width: 230px;
  height: 230px;
  border-radius: 50%;
  border: 2px solid var(--color-border-hover);
  background: var(--color-bg-card);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  transition: border-color 0.3s ease;
}


.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border-radius: 50%;
}


.avatar-container::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    rgba(124, 106, 247, 0.4) 30%,
    transparent 60%
  );
  animation: spin 6s linear infinite;
  z-index: -1;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}


/* Hero Text */
.hero-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hero-brand {
  font-size: clamp(2.5rem, 8vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
  line-height: 1.1;
}

.hero-fullname {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  font-weight: 400;
  color: var(--color-text-secondary);
  letter-spacing: 0.02em;
  margin-bottom: 1rem;
}

.hero-roles {
  font-size: clamp(1rem, 1.5vw, 2rem);
  color: var(--color-text-muted);
  letter-spacing: 0.03em;
  max-width: 550px;
}

/* Social */
.hero-socials {
  margin-top: 0.25rem;
  margin-bottom: 10rem;
}

/* Anchor invisible con offset del header fijo (≈72px) */
.sobre-mi-anchor {
  display: block;
  scroll-margin-top: 80px;
}

/* Encabezado — mismo patrón que .portfolio-header */
.sobre-mi-header {
  width: 100%;
  max-width: 600px;
  text-align: left;
  margin-bottom: -0.5rem;
}

.sobre-mi-title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  font-family: 'Courier New', monospace;
}

.sobre-mi-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 400;
  color: var(--color-text-secondary);
  margin-top: 0.4rem;
  font-family: 'Courier New', monospace;
}

.sobre-mi-divider {
  width: 48px;
  height: 2px;
  background: linear-gradient(to right, var(--color-accent), transparent);
  margin-top: 1.25rem;
  border-radius: 1px;
}

/* Bio */
.hero-bio {
  max-width: 600px;
  padding: 3rem 3rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  position: relative;
  overflow: hidden;
  margin-top: 2rem;
}

.hero-bio::before {
  content: '"';
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  font-size: 5rem;
  color: var(--color-accent-glow);
  font-family: Georgia, serif;
  line-height: 1;
  pointer-events: none;
}

.hero-bio p {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  position: relative;
  z-index: 1;
}

.hero-bio strong {
  color: var(--color-text-primary);
  font-weight: 800;
}
</style>