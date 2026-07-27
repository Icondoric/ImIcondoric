<script setup lang="ts">
import ProjectCard from '@entities/project/ui/ProjectCard.vue'
import type { Project } from '@entities/project/model/types'

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Proyecto 1',
    description: 'Descripción del proyecto. Una aplicación moderna que resuelve un problema real con tecnología de vanguardia.',
    siteUrl: '#',
    tags: ['Vue.js', 'TypeScript'],
  },
  {
    id: 'project-2',
    title: 'Proyecto 2',
    description: 'Descripción del proyecto. Plataforma serverless escalable con integración de APIs externas y diseño responsivo.',
    siteUrl: '#',
    tags: ['Node.js', 'Vercel'],
  },
  {
    id: 'project-3',
    title: 'Proyecto 3',
    description: 'Descripción del proyecto. Herramienta de productividad con interfaz intuitiva y experiencia de usuario excepcional.',
    siteUrl: '#',
    tags: ['Vite', 'Tailwind CSS'],
  },
  {
    id: 'project-4',
    title: 'Proyecto 4',
    description: 'Descripción del proyecto. Sistema con arquitectura de componentes bien definida y cobertura de tests completa.',
    siteUrl: '#',
    tags: ['Playwright', 'Vitest'],
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
