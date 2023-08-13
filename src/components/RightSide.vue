<script setup lang="ts">
import PolaroidPhoto from "./PolaroidPhoto.vue";
import image000 from "@/assets/picture-frame/mato-cola.webp";
import image001 from "@/assets/picture-frame/image1.webp";
import image002 from "@/assets/picture-frame/image2.webp";
import image003 from "@/assets/picture-frame/image3.webp";
import image004 from "@/assets/picture-frame/image4.webp";
import image005 from "@/assets/picture-frame/image5.webp";
import image006 from "@/assets/picture-frame/image6.webp";
import image007 from "@/assets/picture-frame/image7.webp";
import image008 from "@/assets/picture-frame/image8.webp";
import { computed, ref, type ComputedRef, watchEffect } from "vue";
const props = defineProps<{
  width: string;
  openTimestamp: number | null;
  moveImagesTimestamp: number | null;
  animationDuration: number;
}>();
const cardWidth = computed(() => {
  return props.width;
});

const pictures = [
  image000,
  image001,
  image002,
  image003,
  image004,
  image005,
  image006,
  image007,
  image008,
];
shuffle(pictures);
/**
 * From https://stackoverflow.com/a/2450976/3492994
 */
function shuffle<T>(array: T[]) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
let imageIndex = 0;
const getNextPicture = () => {
  const picture = pictures[imageIndex];
  imageIndex += 1;
  if (imageIndex >= pictures.length) {
    imageIndex = 0;
  }
  return picture;
};

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
  const layouts = imageLayouts[Math.floor(Math.random() * imageLayouts.length)];
  return layouts.map((layout) => ({
    layout,
    image: getNextPicture(),
  }));
};
const imageLayout = ref(getRandomImageLayout());

const emojis = ["🍅", "🥭"];

const getRandomEmoji = () => {
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const emoji = ref(getRandomEmoji());

watchEffect(() => {
  const timestamp = props.moveImagesTimestamp;
  if (!timestamp) return;
  imageLayout.value = getRandomImageLayout();
  emoji.value = getRandomEmoji();
});
const fadeDuration = computed(() => props.animationDuration + "s");
</script>

<template>
  <div
    class="clip-photos"
    :class="{
      fadeIn: props.openTimestamp !== null,
      hidden: props.openTimestamp === null,
    }"
  >
    <template v-for="(layout, index) in imageLayout" :key="index">
      <PolaroidPhoto
        :width="`calc(${cardWidth} * ${layout.layout.widthMultiplier})`"
        :image="layout.image"
        :x="layout.layout.x"
        :y="layout.layout.y"
        :rotation="layout.layout.rotation"
      ></PolaroidPhoto>
    </template>
  </div>

  <span class="small-tomato">{{ emoji }}</span>
</template>

<style scoped>
.fadeIn {
  animation: fadeIn v-bind("fadeDuration") ease-in-out;
}
.clip-photos {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  clip-path: polygon(2px -500%, 500% -500%, 500% 500%, 2px 500%);
}
.small-tomato {
  position: absolute;
  bottom: 12px;
  right: 12px;
  transform: rotate(-15deg);
  font-size: calc(var(--card-width) * 0.06);
}
</style>
