<script setup lang="ts">
import PolaroidPhoto from "./PolaroidPhoto.vue";
import image001 from "@/assets/picture-frame/mato-cola.webp";
import { computed, ref, type ComputedRef, watchEffect } from "vue";
const props = defineProps<{
  width: string;
  startTimestamp: number | null;
}>();
const cardWidth = computed(() => {
  return props.width;
});

const pictures = [image001];
const getRandomPicture = () => {
  return pictures[Math.floor(Math.random() * pictures.length)];
};
const image = ref(getRandomPicture());

interface ImageLayout {
  x: string;
  y: string;
  rotation: string;
  widthMultiplier: number;
}
const imageLayouts: ImageLayout[][] = [
  [
    {
      x: "8vw",
      y: "20vh",
      rotation: "-25deg",
      widthMultiplier: 1,
    },
  ],
  [
    {
      x: "1vw",
      y: "20vh",
      rotation: "-35deg",
      widthMultiplier: 1.2,
    },
  ],
  [
    {
      x: "1vw",
      y: "15vh",
      rotation: "14deg",
      widthMultiplier: 1.2,
    },
  ],
  [
    {
      x: "3vw",
      y: "35vh",
      rotation: "8deg",
      widthMultiplier: 0.8,
    },
    {
      x: "19vw",
      y: "8vh",
      rotation: "-14deg",
      widthMultiplier: 0.8,
    },
  ],
];
const getRandomImageLayout = () => {
  return imageLayouts[Math.floor(Math.random() * imageLayouts.length)];
};
const imageLayout = ref(getRandomImageLayout());

watchEffect(() => {
  const timestamp = props.startTimestamp;
  if (!timestamp) return;
  image.value = getRandomPicture();
  imageLayout.value = getRandomImageLayout();
});
</script>

<template>
  <div class="clip-photos">
    <template v-for="(layout, index) in imageLayout" :key="index">
      <PolaroidPhoto
        :width="`calc(${cardWidth} * ${layout.widthMultiplier})`"
        :image="image"
        :x="layout.x"
        :y="layout.y"
        :rotation="layout.rotation"
      ></PolaroidPhoto>
    </template>
  </div>
  <span class="small-tomato">🍅</span>
</template>

<style scoped>
.clip-photos {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  clip-path: polygon(2px -500%, 500% -500%, 500% 500%, 2px 500%);
}
.small-tomato {
  display: none;
  position: absolute;
  bottom: 12px;
  right: 12px;
  transform: rotate(-15deg);
  font-size: calc(var(--card-width) * 0.06);
}
</style>
