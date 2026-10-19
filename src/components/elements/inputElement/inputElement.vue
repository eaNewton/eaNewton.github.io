<script setup lang="ts">
import { useId } from 'vue'

const modelValue = defineModel<string | number | null>()
const props = withDefaults(
  defineProps<{
    error?: boolean
    errorMessage?: string
    label?: string
    minLength?: number
    name?: string
    required?: boolean
    type?: 'text' | 'email' | 'textarea'
  }>(),
  {
    error: false,
    errorMessage: '',
    required: false,
    type: 'text',
  },
)

const emit = defineEmits<{
  blur: [event: FocusEvent]
}>()

const inputId = useId()
const errorId = `${inputId}-error`
</script>

<template>
  <label class="input-container">
    <span v-if="$slots.label || props.label" class="text-label mb-xs">
      <slot name="label">
        {{ props.label }}
      </slot>
    </span>

    <textarea
      v-if="props.type === 'textarea'"
      v-model="modelValue"
      :id="inputId"
      :name="props.name"
      :required="props.required"
      :minlength="props.minLength"
      :aria-invalid="props.error || undefined"
      :aria-describedby="props.error ? errorId : undefined"
      class="input-element textarea pa-sm"
      :class="{ 'input-element--error': props.error }"
      rows="4"
      @blur="emit('blur', $event)"
    />
    <input
      v-else
      v-model="modelValue"
      :id="inputId"
      :name="props.name"
      :required="props.required"
      :minlength="props.minLength"
      :type="props.type"
      :aria-invalid="props.error || undefined"
      :aria-describedby="props.error ? errorId : undefined"
      class="input-element text pa-sm"
      :class="{ 'input-element--error': props.error }"
      @blur="emit('blur', $event)"
    />

    <span v-if="props.error && props.errorMessage" :id="errorId" class="input-error" role="alert">
      {{ props.errorMessage }}
    </span>
  </label>
</template>

<style scoped>
.input-container,
.input-element {
  width: 100%;
}

.input-container {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  min-width: 0;
}

.input-element {
  background: var(--general-text-color);
  border: 1px solid transparent;
  border-radius: 4px;
  font-family: var(--font-family-400);
  outline: none;
}

.input-element:focus-visible {
  border-color: var(--foreground-bg);
}

.input-element--error {
  border-color: var(--validation-error-border);
}

.text-label {
  color: var(--general-text-color);
  font-family: var(--font-family-300);
}

.input-error {
  box-sizing: border-box;
  color: var(--validation-error-text);
  font-family: var(--font-family-300);
  font-size: 0.875rem;
  margin-top: 4px;
  overflow-wrap: anywhere;
  width: 100%;
}

textarea {
  resize: none;
}
</style>
