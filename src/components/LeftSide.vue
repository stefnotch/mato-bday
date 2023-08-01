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
  <div class="left-side">insert text here</div>
</template>

<style scoped></style>
