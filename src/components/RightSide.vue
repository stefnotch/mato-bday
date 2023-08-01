<script setup lang="ts">
import PolaroidPhoto from "./PolaroidPhoto.vue";
import image001 from "@/assets/picture-frame/mato-cola.webp";
import { computed, ref } from "vue";
const props = defineProps<{
  width: string;
}>();
const cardWidth = computed(() => {
  return props.width;
});

const pictures = [image001];
const getRandomPicture = () => {
  return pictures[Math.floor(Math.random() * pictures.length)];
};
const image = ref(getRandomPicture());
</script>

<template>
  <div class="clip-photos">
    <PolaroidPhoto :width="cardWidth" :image="image"></PolaroidPhoto>
  </div>
  <span class="small-tomato">🍅</span>
</template>

<style scoped>
.clip-photos {
  transform: translateZ(1px);
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
