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
  <div class="main-side">
    <br /><br /><span style="white-space: nowrap">To: Mato</span>
  </div>
</template>

<style scoped>
.main-side {
  text-align: center;
  font-size: calc(var(--card-width) * 0.178);
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
