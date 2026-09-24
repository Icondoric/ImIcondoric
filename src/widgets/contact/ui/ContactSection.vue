<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  subject: '',
  message: '',
})

const copied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('iconhu.icc@gmail.com')
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // Fallback if clipboard API is blocked
  }
}

const buildMailtoUrl = () => {
  const subject = form.subject.trim()
    ? form.subject.trim()
    : `Contacto desde Portafolio — ${form.name.trim() || 'Nuevo mensaje'}`

  let body = form.message.trim()
  if (form.name.trim()) {
    body = `De: ${form.name.trim()}\n\n${body}`
  }

  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)

  const queryString = params.toString()
  return `mailto:iconhu.icc@gmail.com${queryString ? `?${queryString}` : ''}`
}

const buildGmailUrl = () => {
  const subject = form.subject.trim()
    ? form.subject.trim()
    : `Contacto desde Portafolio — ${form.name.trim() || 'Nuevo mensaje'}`

  let body = form.message.trim()
  if (form.name.trim()) {
    body = `De: ${form.name.trim()}\n\n${body}`
  }

  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: 'iconhu.icc@gmail.com',
  })
  if (subject) params.set('su', subject)
  if (body) params.set('body', body)

  return `https://mail.google.com/mail/?${params.toString()}`
}

const openDefaultMail = () => {
  window.location.href = buildMailtoUrl()
}
</script>

<template>
  <section id="contacto" class="contact-section">
    <div class="contact-header">
      <h1 class="contact-title"># Contacto</h1>
      <h2 class="contact-subtitle">## Conversemos o trabajemos juntos</h2>
      <div class="contact-divider" />
    </div>

    <div class="contact-grid">
      <!-- Direct Contact Card -->
      <div class="contact-direct-card">
        <div class="direct-icon-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <h3 class="direct-title">Contacto Directo</h3>
        <p class="direct-desc">
          Escríbeme directamente. Al hacer clic se abrirá Gmail listo con mi dirección en el destinatario para que no tengas que escribirlo manualmente:
        </p>
        <a :href="buildMailtoUrl()" class="direct-email-link">iconhu.icc@gmail.com</a>

        <div class="direct-actions">
          <a
            :href="buildGmailUrl()"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-action btn-gmail"
          >
            [ABRIR EN GMAIL]
          </a>
          <button type="button" class="btn-action btn-secondary" @click="copyEmail">
            {{ copied ? '¡COPIADO!' : '[COPIAR CORREO]' }}
          </button>
        </div>
      </div>

      <!-- Quick Composer Card -->
      <div class="contact-form-card">
        <h3 class="composer-title">Redactar Mensaje Rápido</h3>
        <p class="composer-desc">
          Puedes escribir aquí tu nombre y mensaje. Al presionar el botón se abrirá tu correo con todos los datos prellenados y listos para enviar:
        </p>

        <form class="contact-form" @submit.prevent="openDefaultMail">
          <div class="form-group">
            <label for="contact-name" class="form-label">Tu Nombre</label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              class="form-input"
              placeholder="Ej. Alex Pérez"
            />
          </div>

          <div class="form-group">
            <label for="contact-subject" class="form-label">Asunto (Opcional)</label>
            <input
              id="contact-subject"
              v-model="form.subject"
              type="text"
              class="form-input"
              placeholder="Ej. Consulta sobre proyecto / Oportunidad laboral"
            />
          </div>

          <div class="form-group">
            <label for="contact-message" class="form-label">Mensaje</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              rows="4"
              class="form-textarea"
              placeholder="Hola Ivan, te escribo para..."
            />
          </div>

          <div class="form-buttons">
            <button
              type="submit"
              class="btn-action btn-primary btn-large"
            >
              [ENVIAR CON OTRO CORREO]
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  max-width: 860px;
  margin: 0 auto;
  padding: 5rem 1.5rem 6rem;
  scroll-margin-top: 80px;
}

.contact-header {
  margin-bottom: 2.5rem;
}

.contact-title {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  font-family: 'Courier New', monospace;
}

.contact-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 400;
  color: var(--color-text-secondary);
  margin-top: 0.4rem;
  font-family: 'Courier New', monospace;
}

.contact-divider {
  width: 48px;
  height: 2px;
  background: linear-gradient(to right, var(--color-accent), transparent);
  margin-top: 1.25rem;
  border-radius: 1px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.75rem;
}

@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr 1.35fr;
  }
}

/* Direct Card */
.contact-direct-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: border-color 0.3s ease;
}

.contact-direct-card:hover {
  border-color: var(--color-border-hover);
}

.direct-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: var(--color-accent-glow);
  color: var(--color-accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.direct-title,
.composer-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.direct-desc,
.composer-desc {
  font-size: 0.925rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.direct-email-link {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-accent-light);
  text-decoration: none;
  font-family: 'Courier New', monospace;
  word-break: break-all;
  transition: color 0.2s ease;
}

.direct-email-link:hover {
  color: #ffffff;
  text-decoration: underline;
}

.direct-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 1rem;
}

/* Composer Card */
.contact-form-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: border-color 0.3s ease;
}

.contact-form-card:hover {
  border-color: var(--color-border-hover);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  margin-top: 0.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-label {
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-secondary);
}

.form-input,
.form-textarea {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-btn);
  color: var(--color-text-primary);
  padding: 0.75rem 1rem;
  font-size: 0.925rem;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 2px var(--color-accent-glow);
}

.form-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.5rem;
}

@media (min-width: 480px) {
  .form-buttons {
    flex-direction: row;
  }
}

/* Buttons */
.btn-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.15rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: var(--radius-btn);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
  border: 1px solid transparent;
}

.btn-large {
  flex: 1;
  padding: 0.75rem 1.1rem;
}

.btn-primary,
.btn-gmail {
  background: var(--color-accent);
  color: #ffffff;
  border-color: var(--color-accent);
}

.btn-primary:hover,
.btn-gmail:hover {
  background: var(--color-accent-light);
  box-shadow: 0 0 18px var(--color-accent-glow);
}

.btn-secondary {
  background: transparent;
  color: var(--color-accent-light);
  border-color: rgba(124, 106, 247, 0.4);
}

.btn-secondary:hover {
  background: var(--color-accent-glow);
  border-color: var(--color-accent);
  color: #ffffff;
}
</style>
