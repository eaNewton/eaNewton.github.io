<script setup lang="ts">
const src = defineModel<string>('src', { required: true })
</script>

<template>
  <div class="flex">
    <img :src="src" />
  </div>
</template>
