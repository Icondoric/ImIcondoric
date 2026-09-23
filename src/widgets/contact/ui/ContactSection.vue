<script setup lang="ts">
import { reactive, ref } from 'vue'
import { contactSchema, type ContactFormData } from '@shared/lib/validators'

const form = reactive<ContactFormData>({
  name: '',
  email: '',
  message: '',
})

const errors = reactive<Record<string, string>>({
  name: '',
  email: '',
  message: '',
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')
const copied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('iconhu.icc@gmail.com')
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // Fallback if clipboard API is unavailable
  }
}

const validateField = (field: keyof ContactFormData) => {
  const result = contactSchema.safeParse(form)
  if (result.success) {
    errors[field] = ''
    return true
  }
  const fieldErrors = result.error.flatten().fieldErrors
  errors[field] = fieldErrors[field]?.[0] || ''
  return !errors[field]
}

const handleSubmit = async () => {
  submitError.value = ''
  const result = contactSchema.safeParse(form)

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors
    errors.name = fieldErrors.name?.[0] || ''
    errors.email = fieldErrors.email?.[0] || ''
    errors.message = fieldErrors.message?.[0] || ''
    return
  }

  isSubmitting.value = true

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.error || 'Error al enviar el mensaje')
    }

    submitSuccess.value = true
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (err: unknown) {
    submitError.value =
      err instanceof Error
        ? err.message
        : 'No se pudo enviar el mensaje. Por favor escríbeme directamente a iconhu.icc@gmail.com'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  submitSuccess.value = false
  submitError.value = ''
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
      <!-- Direct Email Card -->
      <div class="contact-direct-card">
        <div class="direct-icon-box">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <h3 class="direct-title">Contacto Directo</h3>
        <p class="direct-desc">¿Tienes una propuesta, consulta o proyecto en mente? Escríbeme directamente a:</p>
        <a href="mailto:iconhu.icc@gmail.com" class="direct-email-link">iconhu.icc@gmail.com</a>

        <div class="direct-actions">
          <button type="button" class="btn-direct-copy" @click="copyEmail">
            {{ copied ? '¡COPIADO!' : '[COPIAR CORREO]' }}
          </button>
          <a href="mailto:iconhu.icc@gmail.com" class="btn-direct-send">
            [ABRIR GMAIL]
          </a>
        </div>
      </div>

      <!-- Contact Form Card -->
      <div class="contact-form-card">
        <div v-if="submitSuccess" class="form-success">
          <div class="success-icon">✓</div>
          <h3 class="success-title">¡Mensaje Enviado!</h3>
          <p class="success-desc">
            Gracias por escribir. Te responderé lo antes posible a tu correo electrónico.
          </p>
          <button type="button" class="btn-primary" @click="resetForm">
            [ENVIAR OTRO MENSAJE]
          </button>
        </div>

        <form v-else class="contact-form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="contact-name" class="form-label">Tu Nombre</label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              class="form-input"
              :class="{ 'has-error': errors.name }"
              placeholder="Ej. Alex Pérez"
              @blur="validateField('name')"
            />
            <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label for="contact-email" class="form-label">Tu Correo Electrónico</label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              class="form-input"
              :class="{ 'has-error': errors.email }"
              placeholder="tu@correo.com"
              @blur="validateField('email')"
            />
            <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="contact-message" class="form-label">Mensaje</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              rows="4"
              class="form-textarea"
              :class="{ 'has-error': errors.message }"
              placeholder="Cuéntame sobre tu proyecto, consulta o idea..."
              @blur="validateField('message')"
            />
            <span v-if="errors.message" class="error-msg">{{ errors.message }}</span>
          </div>

          <div v-if="submitError" class="submit-error">
            {{ submitError }}
          </div>

          <button
            type="submit"
            class="btn-primary btn-submit"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'ENVIANDO...' : '[ENVIAR MENSAJE]' }}
          </button>
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

.direct-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.direct-desc {
  font-size: 0.925rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.direct-email-link {
  font-size: 1rem;
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

.btn-direct-copy,
.btn-direct-send {
  padding: 0.55rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: var(--radius-btn);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
}

.btn-direct-copy {
  background: transparent;
  color: var(--color-accent-light);
  border: 1px solid rgba(124, 106, 247, 0.4);
}

.btn-direct-copy:hover {
  background: var(--color-accent-glow);
  border-color: var(--color-accent);
  color: #ffffff;
}

.btn-direct-send {
  background: var(--color-accent);
  color: #ffffff;
  border: 1px solid var(--color-accent);
}

.btn-direct-send:hover {
  background: var(--color-accent-light);
  box-shadow: 0 0 16px var(--color-accent-glow);
}

/* Form Card */
.contact-form-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  padding: 2rem;
  transition: border-color 0.3s ease;
}

.contact-form-card:hover {
  border-color: var(--color-border-hover);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-label {
  font-size: 0.8rem;
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

.form-input.has-error,
.form-textarea.has-error {
  border-color: #ef4444;
}

.error-msg {
  font-size: 0.75rem;
  color: #f87171;
}

.submit-error {
  font-size: 0.85rem;
  color: #f87171;
  background: rgba(239, 68, 68, 0.1);
  padding: 0.75rem;
  border-radius: var(--radius-btn);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.btn-primary {
  padding: 0.75rem 1.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  background: var(--color-accent);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-btn);
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
  width: fit-content;
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-accent-light);
  box-shadow: 0 0 20px var(--color-accent-glow);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 1rem;
  gap: 1rem;
}

.success-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.15);
  color: #4ade80;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.success-title {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.success-desc {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  max-width: 400px;
}
</style>
