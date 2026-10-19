<script setup lang="ts"></script>

<template>
  <div class="card-container pa-md">
    <slot></slot>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
</style>
