<script setup lang="ts">
import { computed, ref } from "vue";
const props = defineProps<{
  width: string;
  image: string;
}>();
const cardWidth = computed(() => {
  return props.width;
});
</script>

<template>
  <div class="photo">
    <div class="img-container">
      <img :src="props.image" />
    </div>
  </div>
  <div class="photo-mirror">bb</div>
</template>

<style scoped>
.photo {
  --card-width: v-bind(cardWidth);
}
.photo,
.photo-mirror {
  position: absolute;
  width: calc(var(--card-width) * 0.6);
  height: calc(var(--card-width) * 0.8);
  transition: transform 0.3s ease-out;
  background: white;
}
.photo {
  top: 0;
  left: 0;
  transform: rotate(-25deg) translate(10px, 50px);
  box-shadow: -4px 1px 5px 0px #e5e5e5, 3px 3px 5px 0px #adadad;
}
.photo .img-container {
  padding: 16px;
  padding-bottom: 32px;
}
.photo img,
.photo-mirror img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.photo-mirror {
  top: 0;
  left: calc(var(--card-width) * -0.6);
  transform: rotate(25deg) translate(-10px, 50px);
  box-shadow: 3px 3px 5px 0px #292929;
}
</style>
