<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const disabled = defineModel<boolean>('disabled', { default: false })
const fullwidth = defineModel<boolean>('fullwidth', { default: false })
const label = defineModel<string>('label', { default: '' })
const loading = defineModel<boolean>('loading', { default: false })
const loadingText = defineModel<string | undefined>('loadingText')
const type = defineModel<'button' | 'submit' | 'reset'>('type', { default: 'button' })

const isDisabled = computed(() => disabled.value || loading.value)
</script>

<template>
  <button
    class="button pa-md"
    :class="{ disabled: disabled, fullwidth: fullwidth }"
    :type="type"
    :disabled="isDisabled"
    :aria-busy="loading || undefined"
    @click="emit('click', $event)"
  >
    <span v-if="loading" class="button-content">
      <span class="loading-spinner" aria-hidden="true"></span>
      <span v-if="loadingText" class="label">{{ loadingText }}</span>
    </span>
    <span v-else class="button-content">
      <slot name="default"></slot>
      <span v-if="label" class="label">{{ label }}</span>
    </span>
  </button>
</template>

<style scoped>
.fullwidth {
  width: 100%;
}

.button {
  background-color: var(--foreground-bg);
  border: none;
  border-radius: 4px;
  color: var(--general-text-color);
  cursor: pointer;
  font-family: var(--font-family-400);
  transition:
    background-color 160ms ease,
    box-shadow 160ms ease,
    opacity 160ms ease;
}

.button.disabled,
.button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.button:active:not(:disabled) {
  transform: translateY(1px);
}

.label {
  font-size: 16px;
}

.loading-spinner {
  animation: buttonElement-spin 700ms linear infinite;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  height: 18px;
  width: 18px;
}

@keyframes buttonElement-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .button,
  .loading-spinner {
    animation-duration: 0.01ms;
    transition-duration: 0.01ms;
  }
}
</style>
