<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { type ConfettiSpawnOptions, ConfettiDrawer } from "./confetti";

const props = defineProps<{
  startTimestamp: number | null;
}>();

const canvasElement = ref<HTMLCanvasElement | null>(null);
const canvasContext = ref<CanvasRenderingContext2D | null>(null);
const confettiDrawer = new ConfettiDrawer();
watchEffect(() => {
  const canvas = canvasElement.value;
  if (canvas) {
    canvasContext.value = canvas.getContext("2d");
    if (!canvasContext.value) return;
    canvasContext.value.imageSmoothingEnabled = false;
  }
});

function render() {
  const ctx = canvasContext.value;
  if (!ctx) {
    requestAnimationFrame(render);
    return;
  }

  if (
    Math.round(ctx.canvas.width) !== Math.round(window.innerWidth) ||
    Math.round(ctx.canvas.height) !== Math.round(window.innerHeight)
  ) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  confettiDrawer.render(ctx);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

const degToRad = (deg: number) => (deg / 180) * Math.PI;

watchEffect(() => {
  if (props.startTimestamp === null) return;

  const canvas = canvasElement.value;
  if (!canvas) return;

  confettiDrawer.addConfetti({
    x: canvas.width * 0.5,
    y: canvas.height / 2,
    velocity: 8,
    angle: degToRad(90 + 45),
    spread: degToRad(45),
    count: 100,
  });
  confettiDrawer.addConfetti({
    x: canvas.width * 0.5,
    y: canvas.height / 2,
    velocity: 8,
    angle: degToRad(90 - 45),
    spread: degToRad(45),
    count: 100,
  });
});
</script>

<template>
  <canvas ref="canvasElement"></canvas>
</template>

<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  user-select: none;
  pointer-events: none;
  width: 100%;
  height: 100%;
}
</style>
