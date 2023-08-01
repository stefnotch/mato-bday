<script setup lang="ts">
import { computed, ref } from "vue";
const props = defineProps<{
  width: string;
}>();
const cardWidth = computed(() => {
  return props.width;
});
</script>

<template>
  <div class="main-side">
    <br /><br /><span style="white-space: nowrap" class="mato-text"
      >To: Mato</span
    >

    <!--<svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
      <filter id="noise2">
        <feTurbulence baseFrequency="0.035" />
        <feDisplacementMap in="SourceGraphic" scale="8" />
        <feGaussianBlur stdDeviation="1"></feGaussianBlur>
        <feMorphology operator="erode" radius="1 1" />
        <feColorMatrix
          type="matrix"
          values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 29 -1"
          result="goo"
        />
        <feComposite in="displaced" in2="goo" operator="atop" />
      </filter>
    </svg>-->
  </div>
</template>

<style scoped>
.main-side {
  height: 100%;
  text-align: center;
  font-size: calc(var(--card-width) * 0.178);
  font-family: "Parisienne", cursive;
  color: #008000;
}

/*
.mato-text {
  color: transparent;
  background: linear-gradient(
    to right,
    #462523 0,
    #cb9b51 22%,
    #f6e27a 45%,
    #f6f2c0 50%,
    #f6e27a 55%,
    #cb9b51 78%,
    #462523 100%
  );
  background-size: 80%;
  background-clip: text;
}*/
</style>
