<script setup lang="ts"></script>

<template>
  <div class="drag-hint">
    <p>⮜ Drag to open</p>
  </div>
</template>

<style scoped>
.drag-hint {
  position: absolute;
  bottom: 0;
  right: 0;
  color: rgb(113, 113, 113);
  user-select: none;
}
</style>
