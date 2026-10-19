<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import emailjs from '@emailjs/browser'

import inputElement from '@/components/elements/inputElement'
import buttonElement from '@/components/elements/buttonElement'

const { t } = useI18n()

const name = ref<string>('')
const email = ref<string>('')
const message = ref<string>('')
const isSubmitting = ref<boolean>(false)
const form = ref<HTMLFormElement | null>(null)
const submissionStatus = ref<'idle' | 'success' | 'error'>('idle')

const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const isNameValid = computed(() => name.value.trim().length >= 2)
const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))
const isMessageValid = computed(() => message.value.trim().length > 0)
const isFormValid = computed(() => isNameValid.value && isEmailValid.value && isMessageValid.value)

const handleSubmit = async () => {
  if (!form.value || !isFormValid.value) return

  if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
    submissionStatus.value = 'error'
    console.error('EmailJS configuration is missing. Set the VITE_EMAILJS_* variables.')
    return
  }

  isSubmitting.value = true
  submissionStatus.value = 'idle'

  try {
    await emailjs.sendForm(emailJsServiceId, emailJsTemplateId, form.value, {
      publicKey: emailJsPublicKey,
    })
    submissionStatus.value = 'success'
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (error) {
    submissionStatus.value = 'error'
    console.error('[ContactForm] EmailJS send failed:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form ref="form" class="contact-form" @submit.prevent="handleSubmit">
    <inputElement
      v-model="name"
      :label="t('contact-form.name')"
      name="user_name"
      required
      class="mb-md"
    />
    <inputElement
      v-model="email"
      :label="t('contact-form.email')"
      name="user_email"
      type="email"
      required
      class="mb-md"
    />
    <inputElement
      v-model="message"
      :label="t('contact-form.message')"
      name="message"
      type="textarea"
      required
    />

    <div class="mt-md">
      <buttonElement
        :label="t('contact-form.submit')"
        :loading="isSubmitting"
        :disabled="!isFormValid"
        type="submit"
        fullwidth
      />
    </div>
    <p v-if="submissionStatus === 'success'" class="form-status" role="status">
      {{ t('contact-form.success') }}
    </p>
    <p v-else-if="submissionStatus === 'error'" class="form-status" role="alert">
      {{ t('contact-form.error') }}
    </p>
  </form>
</template>

<style scoped>
.contact-form {
  width: 100%;
}

.form-status {
  color: var(--general-text-color);
  font-family: var(--font-family-300);
}
</style>
