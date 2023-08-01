<script setup lang="ts">
import { computed, ref } from "vue";
const props = defineProps<{
  x: string;
  y: string;
  width: string;
  rotation: string;
  image: string;
}>();
</script>

<template>
  <div class="photo-container">
    <div class="photo">
      <div class="img-container">
        <img :src="props.image" />
      </div>
    </div>
    <div class="photo-mirror">bb</div>
  </div>
</template>

<style scoped>
.photo-container {
  --x: v-bind(props.x);
  --y: v-bind(props.y);
  --width: v-bind(props.width);
  --rotation: v-bind(props.rotation);
}
.photo,
.photo-mirror {
  position: absolute;
  width: calc(var(--width) * 0.6);
  height: calc(var(--width) * 0.8);
  transition: transform 1s ease-out, width 0s ease-out, height 0s ease-out;
  background: white;
}
.photo {
  top: 0;
  left: 0;
  transform: translate(var(--x), var(--y)) rotate(var(--rotation));
  box-shadow: -4px 1px 5px 0px #0000001c, 3px 3px 5px 0px #adadad;
}
.photo-mirror {
  top: 0;
  left: calc(var(--width) * -0.6);
  transform: translate(calc(var(--x) * -1), var(--y))
    rotate(calc(var(--rotation) * -1));
  box-shadow: 3px 3px 5px 0px #292929;
}
.photo .img-container {
  padding: 16px;
  padding-bottom: 32px;
}
.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
