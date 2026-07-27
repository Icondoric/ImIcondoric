<script setup lang="ts">
import SocialIcon from '@shared/ui/SocialIcon.vue'
</script>

<template>
  <section id="inicio" class="hero-section">
<section id="inicio" class="hero-section">
    <!-- Avatar -->
    <div class="avatar-wrapper animate-fade-up">
      <div class="avatar-container glow-pulse" id="hero-avatar">
        <!-- ANTES: Aquí estaba el <div class="avatar-placeholder"> con el <svg> -->
        
        <!-- AHORA: Reemplazamos todo lo anterior por la etiqueta <img> -->
        <img 
          src="/me2.png" 
          alt="Ivan Condori Choquehuanca" 
          class="avatar-image"
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

    <!-- Bio -->
    <div class="hero-bio animate-fade-up-delay-5" id="sobre-mi">
      <p>
        <strong>
          ¡Hola! Soy Ivan Condori Choquehuanca (Icondoric) de La Paz, Bolivia.
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
  margin-bottom: 0.25rem;
}

.avatar-container {
  width: 130px;
  height: 130px;
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

.avatar-placeholder {
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hero Text */
.hero-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hero-brand {
  font-size: clamp(2.5rem, 6vw, 3.5rem);
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
}

.hero-roles {
  font-size: clamp(0.8rem, 1.5vw, 0.9rem);
  color: var(--color-text-muted);
  letter-spacing: 0.03em;
  max-width: 520px;
}

/* Social */
.hero-socials {
  margin: 0.25rem 0;
}

/* Bio */
.hero-bio {
  max-width: 620px;
  padding: 1.75rem 2rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  position: relative;
  overflow: hidden;
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
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--color-text-secondary);
  position: relative;
  z-index: 1;
}

.hero-bio strong {
  color: var(--color-text-primary);
  font-weight: 600;
}
</style>
