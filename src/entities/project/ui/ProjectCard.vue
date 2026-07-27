<script setup lang="ts">
import type { Project } from '@entities/project/model/types'

defineProps<{
  project: Project
  index: number
}>()
</script>

<template>
  <article class="project-card" :style="`animation-delay: ${index * 0.1}s`">
    <!-- Image Placeholder -->
    <div class="project-image-container">
      <div v-if="!project.imageUrl" class="project-image-placeholder">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span>Vista previa del proyecto</span>
      </div>
      <img v-else :src="project.imageUrl" :alt="project.title" class="project-image" />
    </div>

    <!-- Content -->
    <div class="project-content">
      <div class="project-tags">
        <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</span>
      </div>
      <h2 class="project-title">{{ project.title }}</h2>
      <p class="project-description">{{ project.description }}</p>
      <a :href="project.siteUrl || '#'" class="project-cta" target="_blank" rel="noopener noreferrer">
        [VISITAR SITIO WEB]
      </a>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  overflow: hidden;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.project-card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--color-accent-glow);
}

/* Image */
.project-image-container {
  width: 100%;
  aspect-ratio: 16 / 7;
  overflow: hidden;
  background: var(--color-bg-secondary);
  position: relative;
}

.project-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
}

.project-image-placeholder span {
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image {
  transform: scale(1.03);
}

/* Content */
.project-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-tag {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-light);
  background: var(--color-accent-glow);
  border: 1px solid rgba(124, 106, 247, 0.2);
  border-radius: 4px;
  padding: 0.2rem 0.6rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.3;
}

.project-description {
  font-size: 0.925rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.project-cta {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.6rem 1.2rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent-light);
  border: 1px solid rgba(124, 106, 247, 0.4);
  border-radius: var(--radius-btn);
  text-decoration: none;
  transition: all 0.25s ease;
  width: fit-content;
}

.project-cta:hover {
  background: var(--color-accent-glow);
  border-color: var(--color-accent);
  color: white;
  box-shadow: 0 0 20px var(--color-accent-glow);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
