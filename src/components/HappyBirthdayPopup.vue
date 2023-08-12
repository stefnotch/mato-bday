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
  "ToMato! 🍅",
  "To Mato! 🍅",
  "To  Mato! 🍅",
  "To o Mato! 🍅",
  "To ot Mato! 🍅",
  "To out Mato! 🍅",
  "To oust Mato! 🍅",
  "To ourst Mato! 🍅",
  "To ourest Mato! 🍅",
  "To our est Mato! 🍅",
  "To our rest Mato! 🍅",
  "To our drest Mato! 🍅",
  "To our darest Mato! 🍅",
  "To our dearest Mato! 🍅",
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
    :class="{
      showAnimation: props.startTimestamp !== null,
      hideAnimation: props.startTimestamp === null,
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
.showAnimation {
  animation: showAnimation 5s ease-in-out 0s 1 normal forwards running;
  opacity: 1;
}

@keyframes showAnimation {
  0% {
    transition: none;
    opacity: 0;
    transform: translateY(0) scale(0);
  }
  50% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    transform: translateY(calc(var(--card-width) * -0.5)) scale(0.8);
  }
}

.hideAnimation {
  transition: none;
  opacity: 0;
  transform: translateY(0) scale(0);
}

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
  user-select: none;
  pointer-events: none;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  color: #20ab51;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size: calc(2.3vw);
  filter: drop-shadow(10px 40px 4px #00000036);
  --card-width: v-bind("cardWidth");
}
.happy-birthday-message h1,
.happy-birthday-message h2 {
  padding: 0;
  margin: 0;
  font-weight: normal;
  filter: drop-shadow(1px 2px 0px black);
}
.happy-birthday-image {
  width: calc(var(--card-width) * 1.8);
  image-rendering: pixelated;
  filter: drop-shadow(1px 2px 0px black);
}
</style>
