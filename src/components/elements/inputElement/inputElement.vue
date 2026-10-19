<script setup lang="ts">
import { useId } from 'vue'

const label = defineModel<string>('label', { required: false })
const modelValue = defineModel<string | number | null>()
const type = defineModel<'text' | 'email' | 'textarea'>('type', {
  default: 'text',
  required: false,
})
const props = withDefaults(defineProps<{ name?: string; required?: boolean }>(), {
  required: false,
})

const inputId = useId()
</script>

<template>
  <label class="input-container">
    <div v-if="$slots.label || label" class="text-label mb-xs">
      <slot name="label">
        {{ label }}
      </slot>
    </div>

    <textarea
      v-if="type === 'textarea'"
      v-model="modelValue"
      :id="inputId"
      :name="props.name"
      :required="props.required"
      class="input-element textarea pa-sm"
      rows="4"
    />
    <input
      v-else
      v-model="modelValue"
      :id="inputId"
      :name="props.name"
      :required="props.required"
      :type="type"
      class="input-element text pa-sm"
    />
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
}

.input-element {
  background: var(--general-text-color);
  border: none;
  border-radius: 4px;
  font-family: var(--font-family-400);
  outline: none;
}

.text-label {
  color: var(--general-text-color);
  font-family: var(--font-family-300);
}
</style>
