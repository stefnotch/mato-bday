<script setup lang="ts">
import { clamp, degToRad } from "@/math";
import { computed, ref } from "vue";
const props = defineProps<{
  width: string;
  angle: number;
}>();
const cardWidth = computed(() => {
  return props.width;
});

const shineOffset = computed(() => {
  const cardAngle = props.angle - 170;
  return cardAngle * 1 + "vh";
});

const redShineOpacity = computed(() => {
  const cardAngle = props.angle - 150;
  const shine = Math.sin(cardAngle) / cardAngle - 0.01;
  return clamp(shine, 0, 0.3);
});
</script>

<template>
  <div class="main-side">
    <div class="mato-text">
      <span>&nbsp;To: Mato</span>
    </div>
    <div class="decorations">
      <div
        class="decoration"
        style="width: 70%; height: 4px; top: 55%; left: 18%"
      ></div>
      <div
        class="decoration"
        style="width: 30%; height: 4px; top: 60%; left: 38%"
      ></div>
    </div>

    <div class="top-right-images">
      <div class="gold-shine">
        <img src="@/assets/tomatoes-outlines.png" />
      </div>
      <div class="red-shine"><img src="@/assets/tomatoes-fill.png" /></div>
    </div>
    <!--<img src="@/assets/tomatoes-fill.png" class="top-right-image" />-->
    <!-- <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
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

      <filter id="gold">
        <feTurbulence
          baseFrequency="0.02 0.02"
          numOctaves="3"
          result="noise"
          seed="0"
        ></feTurbulence>
        <feComposite
          operator="in"
          in="SourceGraphic"
          in2="noise"
          result="xfG3YK"
        ></feComposite>
      </filter>
    </svg>-->
  </div>
</template>

<style scoped>
.main-side {
  --card-width: v-bind("cardWidth");
}
.main-side {
  height: 100%;
}
.top-right-images {
  position: absolute;
  top: 0;
  right: 0;
  height: 20%;
}
.gold-shine {
  height: 100%;
  /* AAAAAA why do I need vendor prefixes for this? */
  mask: url("@/assets/tomatoes-outlines.png");
  mask-size: 100%;
  -webkit-mask: url("@/assets/tomatoes-outlines.png");
  -webkit-mask-size: 100%;
  background: linear-gradient(
    335deg,
    #462523 0,
    #cb9b51 11%,
    #f6e27a 22%,
    #f6f2c0 25%,
    #f6e27a 28%,
    #cb9b51 39%,
    #462523 50%,
    #cb9b51 61%,
    #f6e27a 72%,
    #f6f2c0 75%,
    #f6e27a 78%,
    #cb9b51 89%,
    #462523 100%
  );
  /* Gradient size / sin(gradient angle) */
  /* https://stackoverflow.com/a/63787567/3492994 */
  background-size: 280% calc(280% / 0.42261826174);
  background-position: 0 calc(v-bind("shineOffset"));
}
.gold-shine img {
  opacity: 0;
}
.top-right-images img {
  height: 100%;
}
.red-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  mask: url("@/assets/tomatoes-fill.png");
  mask-size: 100%;
  -webkit-mask: url("@/assets/tomatoes-fill.png");
  -webkit-mask-size: 100%;

  background: rgba(255, 0, 0, 0.774);
  opacity: v-bind("redShineOpacity");
}
.red-shine img {
  opacity: 0;
}
.mato-text {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  text-align: center;
  height: 100%;
}
.mato-text span {
  margin-bottom: calc(var(--card-width) * 0.1);
  font-size: calc(var(--card-width) * 0.178);
  font-family: "Parisienne", cursive;
  color: #008000;
}
.decorations {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.decorations .decoration {
  position: absolute;
  background: #008000;
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
