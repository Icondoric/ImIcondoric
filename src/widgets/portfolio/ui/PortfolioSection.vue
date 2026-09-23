<script setup lang="ts">
import ProjectCard from '@entities/project/ui/ProjectCard.vue'
import type { Project } from '@entities/project/model/types'

const projects: Project[] = [
  {
    id: 'evaluacion-perfiles',
    title: 'Sistema de Evaluación de Perfiles (PLN + ML)',
    description:
      'Sistema de evaluación y clasificación de candidatos mediante Procesamiento de Lenguaje Natural y Machine Learning (Ridge Regression). Integra extracción inteligente de CVs en PDF con Gemini API, panel institucional configurable y motor de recomendaciones.',
    githubUrl: 'https://github.com/PROJECTS2026EM/EVALUACION_PERFILES',
    tags: ['FastAPI', 'Python', 'Vue 3', 'NLP / spaCy', 'Machine Learning', 'Gemini API', 'Supabase'],
  },
  {
    id: 'cvmorfosis',
    title: 'CVMorfosis — ATS & Harvard CV Builder',
    description:
      'Generador de currículum vitae profesional optimizado para sistemas de seguimiento de candidatos (ATS) y estandarizado con el formato Harvard. Incluye múltiples plantillas ejecutivas y un servicio backend dedicado con Puppeteer para exportación PDF de alta precisión.',
    githubUrl: 'https://github.com/Icondoric/CVMorfosis',
    tags: ['Vue 3', 'TypeScript', 'Node.js', 'Express', 'Puppeteer', 'Tailwind CSS'],
  },
]
</script>

<template>
  <section id="portafolio" class="portfolio-section">
    <div class="portfolio-header">
      <h1 class="portfolio-title"># Portafolio</h1>
      <h2 class="portfolio-subtitle">## Mis proyectos destacados</h2>
      <div class="portfolio-divider" />
    </div>

    <div class="projects-grid">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.id"
        :project="project"
        :index="index"
      />
    </div>
  </section>
</template>

<style scoped>
.portfolio-section {
  max-width: 860px;
  margin: 0 auto;
  padding: 5rem 1.5rem 6rem;
}

.portfolio-header {
  margin-bottom: 3rem;
}

.portfolio-title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  font-family: 'Courier New', monospace;
}

.portfolio-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 400;
  color: var(--color-text-secondary);
  margin-top: 0.4rem;
  font-family: 'Courier New', monospace;
}

.portfolio-divider {
  width: 48px;
  height: 2px;
  background: linear-gradient(to right, var(--color-accent), transparent);
  margin-top: 1.25rem;
  border-radius: 1px;
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}
</style>
