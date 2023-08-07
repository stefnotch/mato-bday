<script setup lang="ts">
import { computed, ref } from "vue";
const props = defineProps<{
  width: string;
}>();
const cardWidth = computed(() => {
  return props.width;
});
</script>

<template>
  <div class="left-side">
    <div class="text">Dear Mato, we all wish you a very happy birthday!</div>
  </div>
</template>

<style scoped>
.left-side {
  height: 100%;
}

.text {
  font-size: calc(var(--card-width) * 0.06);
  padding-top: calc(var(--card-width) * 0.2);
  padding-left: 40px;
  padding-right: 40px;
}
</style>
