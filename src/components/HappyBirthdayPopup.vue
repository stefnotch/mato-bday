<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  width: string;
  startTimestamp: number | null;
}>();
const cardWidth = computed(() => {
  return props.width;
});

const animationFrames = [
  "ToMato!",
  "To Mato!",
  "To  Mato!",
  "To o Mato!",
  "To ot Mato!",
  "To out Mato!",
  "To oust Mato!",
  "To ourst Mato!",
  "To ourest Mato!",
  "To our est Mato!",
  "To our rest Mato!",
  "To our drest Mato!",
  "To our darest Mato!",
  "To our dearest Mato!",
];

const subtitleText = ref("");

function render() {
  if (!props.startTimestamp) {
    subtitleText.value = "";
    requestAnimationFrame(render);
    return;
  }

  const deltaSeconds = Math.max(
    0,
    (Date.now() - props.startTimestamp - 2100) / 1000
  );
  const frame =
    animationFrames[
      Math.min(animationFrames.length - 1, Math.floor(deltaSeconds * 25))
    ];
  subtitleText.value = frame;
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
</script>

<template>
  <div
    class="happy-birthday-message"
    :style="{
      transition: props.startTimestamp
        ? 'opacity 0.5s ease-in-out, transform 0.7s 0.0s ease-in-out'
        : 'none',
      opacity: props.startTimestamp ? 1 : 0,
      transform: props.startTimestamp
        ? 'translateY(calc(var(--card-width) * -0.5)) scale(1)'
        : 'translateY(0) scale(0.6)',
    }"
  >
    <div>
      <h1>
        <img
          src="@/assets/terraria-happy-birthday.png"
          alt="Happy Birthday!"
          class="happy-birthday-image"
        />
      </h1>
      <h2 class="happy-birthday-message-subtitle">{{ subtitleText }}</h2>
    </div>
  </div>
</template>

<style scoped>
.happy-birthday-message {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  /*display: none;*/
  user-select: none;
  pointer-events: none;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: calc(2vw);
  filter: drop-shadow(30px 50px 4px #00000036);
  --card-width: v-bind("cardWidth");
}
.happy-birthday-message h1,
.happy-birthday-message h2 {
  padding: 0;
  margin: 0;
}
.happy-birthday-image {
  width: 80vw;
  image-rendering: pixelated;
}
</style>
