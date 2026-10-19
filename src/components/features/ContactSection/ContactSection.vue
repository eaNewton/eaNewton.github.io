<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import cardElement from '@/components/elements/cardElement'
import ContactForm from '@/components/features/ContactForm'

const { t } = useI18n()
</script>

<template>
  <cardElement class="contact-section-container">
    <div class="section-title-container mb-xxl">
      <h2 class="section-title">{{ t('contact-section.title') }}</h2>
    </div>

    <div class="contact-form-container flex pa-md mb-xxl">
      <ContactForm />
    </div>
  </cardElement>
</template>

<style scoped>
.contact-form-container {
  box-sizing: border-box;
  background: var(--middleground-bg-transparent);
  border-radius: 8px;
  flex: 1 1 0%;
  min-width: 0;
  max-width: 400px;
  width: 100%;
}

.contact-section-container {
  align-items: center;
  justify-content: center;
}

.section-title-container {
  width: 100%;
}

.section-title {
  color: var(--general-text-color);
  font-family: var(--font-family-400);
  text-align: center;
  width: 100%;
}
</style>
