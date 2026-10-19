<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
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
const submitAttempted = ref(false)
const touched = reactive({ name: false, email: false, message: false })
const website = ref('')

const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const isNameValid = computed(() => name.value.trim().length >= 2)
const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))
const isMessageValid = computed(() => message.value.trim().length >= 10)
const isFormValid = computed(() => isNameValid.value && isEmailValid.value && isMessageValid.value)

const showNameError = computed(() => (touched.name || submitAttempted.value) && !isNameValid.value)
const showEmailError = computed(
  () => (touched.email || submitAttempted.value) && !isEmailValid.value,
)
const showMessageError = computed(
  () => (touched.message || submitAttempted.value) && !isMessageValid.value,
)

const handleSubmit = async () => {
  submitAttempted.value = true

  if (!form.value || !isFormValid.value) return

  if (website.value) {
    submissionStatus.value = 'success'
    return
  }

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
    submitAttempted.value = false
    touched.name = false
    touched.email = false
    touched.message = false
  } catch (error) {
    submissionStatus.value = 'error'
    console.error('[ContactForm] EmailJS send failed:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form ref="form" class="contact-form" novalidate @submit.prevent="handleSubmit">
    <div class="contact-form-honeypot" aria-hidden="true">
      <label for="contact-website">Leave this field empty</label>
      <input
        id="contact-website"
        v-model="website"
        name="website_url"
        type="text"
        tabindex="-1"
        autocomplete="off"
      />
    </div>
    <inputElement
      v-model="name"
      :error="showNameError"
      :error-message="
        !name.trim()
          ? t('contact-form.validation.nameRequired')
          : t('contact-form.validation.nameMinLength')
      "
      :label="t('contact-form.name')"
      name="user_name"
      required
      :min-length="2"
      type="text"
      class="mb-md"
      @blur="touched.name = true"
    />
    <inputElement
      v-model="email"
      :error="showEmailError"
      :error-message="
        !email.trim()
          ? t('contact-form.validation.emailRequired')
          : t('contact-form.validation.emailInvalid')
      "
      :label="t('contact-form.email')"
      name="user_email"
      type="email"
      required
      class="mb-md"
      @blur="touched.email = true"
    />
    <inputElement
      v-model="message"
      :error="showMessageError"
      :error-message="
        !message.trim()
          ? t('contact-form.validation.messageRequired')
          : t('contact-form.validation.messageMinLength')
      "
      :label="t('contact-form.message')"
      name="message"
      type="textarea"
      required
      :min-length="10"
      @blur="touched.message = true"
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
  box-sizing: border-box;
  max-width: 100%;
  min-width: 0;
  width: 100%;
}

.form-status {
  color: var(--general-text-color);
  font-family: var(--font-family-300);
}

.contact-form-honeypot {
  height: 1px;
  left: -10000px;
  overflow: hidden;
  position: absolute;
  top: auto;
  width: 1px;
}
</style>
