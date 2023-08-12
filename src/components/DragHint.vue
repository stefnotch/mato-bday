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
  right: 12px;
  color: rgb(113, 113, 113);
  user-select: none;
  font-family: "Parisienne", cursive;
  font-weight: bold;
  font-size: calc(var(--card-width) * 0.04);
}
</style>
