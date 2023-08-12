<script setup lang="ts">
import { computed, ref } from "vue";
const props = defineProps<{
  width: string;
  openTimestamp: number | null;
}>();
const cardWidth = computed(() => {
  return props.width;
});
</script>

<template>
  <div class="left-side">
    <div
      class="text"
      :class="{
        fadeIn: props.openTimestamp !== null,
        hidden: props.openTimestamp === null,
      }"
    >
      Dear Mato, we all wish you a very Happy Birthday!
    </div>
  </div>
</template>

<style scoped>
.left-side {
  height: 100%;
}

.text {
  font-family: "Parisienne", cursive;
  transition: opacity 1s 2s ease-in-out;
  font-size: calc(var(--card-width) * 0.06);
  padding-top: calc(var(--card-width) * 0.5);
  padding-left: 40px;
  padding-right: 40px;
  text-align: center;
}
</style>
