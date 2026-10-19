<script setup lang="ts">
const clickable = defineModel<boolean>('clickable', { default: false, required: false })
const title = defineModel<string>('title', { required: false })
const expanded = defineModel<boolean>('expanded', { default: false })

defineProps<{
  contentId?: string
}>()
</script>

<template>
  <div class="item">
    <button
      v-if="clickable && title"
      class="item-toggle pa-md"
      :class="{ 'item-toggle--expanded': expanded }"
      type="button"
      :aria-expanded="expanded"
      :aria-controls="contentId"
      @click="expanded = !expanded"
    >
      <h4 class="item-title">{{ title }}</h4>
      <span class="item-toggle-indicator" aria-hidden="true"></span>
    </button>
    <div v-else-if="title">
      <h4 class="item-title">{{ title }}</h4>
    </div>
    <div
      v-if="clickable"
      :id="contentId"
      class="item-content"
      :class="{ 'item-content--expanded': expanded }"
      :aria-hidden="!expanded"
      :inert="!expanded"
    >
      <div class="item-content-inner">
        <slot></slot>
      </div>
    </div>
    <slot v-else></slot>
  </div>
</template>

<style scoped>
.clickable:hover {
  cursor: pointer;
}

.item {
  border-radius: 8px;
}

.item-title {
  font-family: var(--font-family-300);
}

.item-toggle {
  align-items: center;
  background-color: var(--middleground-bg-transparent);
  border: none;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: inherit;
  cursor: pointer;
  display: flex;
  font: inherit;
  justify-content: space-between;
  text-align: left;
  transition:
    border-bottom-left-radius 0.15s ease-in-out,
    border-bottom-right-radius 0.15s ease-in-out;
  width: 100%;
}

.item-toggle:not(.item-toggle--expanded) {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.item-toggle > span:first-child {
  font-family: var(--font-family-300);
}

.item-toggle:focus-visible {
  border-radius: 2px;
  outline: 2px solid var(--general-text-color);
  outline-offset: 4px;
}

.item-toggle-indicator {
  border-bottom: 1.5px solid currentColor;
  border-right: 1.5px solid currentColor;
  flex: 0 0 8px;
  height: 8px;
  margin: 0 4px 4px 12px;
  transform: rotate(45deg);
  transition: transform 280ms cubic-bezier(0.2, 0.75, 0.25, 1);
}

.item-content {
  border-bottom: 1px solid var(--middleground-bg-transparent);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-left: 1px solid var(--middleground-bg-transparent);
  border-right: 1px solid var(--middleground-bg-transparent);
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 320ms cubic-bezier(0.2, 0.75, 0.25, 1),
    opacity 220ms ease;
}

.item-content--expanded {
  grid-template-rows: 1fr;
  opacity: 1;
}

.item-content--expanded .item-content-inner {
  padding-block: 16px;
}

.item-content-inner {
  background-color: var(--background-bg-transparent);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  min-height: 0;
  overflow: hidden;
  padding: 0 16px;
  transition: padding-block 320ms cubic-bezier(0.2, 0.75, 0.25, 1);
}

.item-toggle--expanded .item-toggle-indicator {
  transform: rotate(225deg);
}

@media (prefers-reduced-motion: reduce) {
  .item-toggle-indicator,
  .item-content,
  .item-content-inner {
    transition: none;
  }
}
</style>
