<script setup lang="ts">
import { computed, ref } from "vue";
const props = defineProps<{
  width: string;
  openTimestamp: number | null;
  animationDuration: number;
}>();
const cardWidth = computed(() => {
  return props.width;
});

const fadeDuration = computed(() => props.animationDuration + "s");
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
.fadeIn {
  animation: fadeIn v-bind("fadeDuration") ease-in-out;
}
.left-side {
  height: 100%;
}

.text {
  font-family: "Parisienne", cursive;
  font-size: calc(var(--card-width) * 0.06);
  padding-top: calc(var(--card-width) * 0.5);
  padding-left: 40px;
  padding-right: 40px;
  text-align: center;
}
</style>
