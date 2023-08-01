<script setup lang="ts">
import FrontSide from "./FrontSide.vue";
import LeftSide from "./LeftSide.vue";
import RightSide from "./RightSide.vue";
import HappyBirthdayPopup from "./HappyBirthdayPopup.vue";
import TerrariaConfetti from "./TerrariaConfetti.vue";
import { computed, ref, watchEffect } from "vue";

const { isLandscape } = useScreenOrientation();

const cardWidth = computed(() =>
  isLandscape.value ? `calc(min(100vh * 0.6, 45vw))` : `45vmin`
);
function useScreenOrientation() {
  const getIsLandscape = () => {
    const type = screen.orientation.type;
    const isLandscape = type.startsWith("landscape");
    return isLandscape;
  };
  const isLandscape = ref(getIsLandscape());
  screen.orientation.addEventListener("change", (ev) => {
    isLandscape.value = getIsLandscape();
  });
  return { isLandscape };
}

const cardDrag = useCardDrag();

function useCardDrag() {
  let pointerStart: null | {
    x: number;
    cardAngle: number;
  } = null;
  const minAngle = 5;
  const maxAngle = 170;
  const forceCardAngle = ref<number | null>(null);
  const cardAngle = ref(minAngle); // TODO: Change to maxAngle

  const isAnimating = computed(() => {
    return forceCardAngle.value !== null;
  });

  let setCardAngle = (angle: number) => {
    cardAngle.value = clamp(angle, minAngle, maxAngle);
    forceCardAngle.value = null;
  };

  function clamp(x: number, min: number, max: number) {
    return Math.min(Math.max(x, min), max);
  }

  const pointerDown = (ev: PointerEvent) => {
    setCardAngle(forceCardAngle.value ?? cardAngle.value);
    pointerStart = { x: ev.clientX, cardAngle: cardAngle.value };
    (ev.target as any)?.setPointerCapture?.(ev.pointerId);
  };
  const pointerMove = (ev: PointerEvent) => {
    if (!pointerStart) return;
    const dx = ev.clientX - pointerStart.x;
    setCardAngle(pointerStart.cardAngle + dx * 0.8);
  };
  const pointerUp = (ev: PointerEvent) => {
    pointerStart = null;
    if (cardAngle.value < 90) {
      forceCardAngle.value = minAngle;
    } else {
      forceCardAngle.value = maxAngle;
    }
    (ev.target as any)?.setPointerCapture?.(ev.pointerId);
  };

  return {
    isAnimating,
    cardAngle: computed(() => {
      return forceCardAngle.value ?? cardAngle.value;
    }),
    pointerDown,
    pointerMove,
    pointerUp,
  };
}

const cardOpenTimestamp = ref<number | null>(null);
watchEffect(() => {
  const cardAngle = cardDrag.cardAngle.value;
  let isCardOpen = cardAngle < 70;
  if (isCardOpen) {
    if (cardOpenTimestamp.value === null) {
      cardOpenTimestamp.value = Date.now();
    }
  } else {
    cardOpenTimestamp.value = null;
  }
});

const cardClosedTimestamp = ref<number | null>(null);
watchEffect(() => {
  const cardAngle = cardDrag.cardAngle.value;
  let isCardClosed = cardAngle > 120;
  if (isCardClosed) {
    if (cardClosedTimestamp.value === null) {
      cardClosedTimestamp.value = Date.now();
    }
  } else {
    cardClosedTimestamp.value = null;
  }
});
</script>

<template>
  <div class="card">
    <div
      class="card-left"
      :style="{
        transform: `rotateY(${cardDrag.cardAngle.value}deg)`,
        transition: cardDrag.isAnimating.value
          ? `transform 0.5s ease-in-out`
          : undefined,
      }"
      @pointerdown="cardDrag.pointerDown"
      @pointermove="cardDrag.pointerMove"
      @pointerup="cardDrag.pointerUp"
      @pointercancel="cardDrag.pointerUp"
    >
      <div class="front card-page">
        <LeftSide :width="cardWidth"></LeftSide>
      </div>
      <div class="back card-page">
        <FrontSide :width="cardWidth" />
      </div>
    </div>
    <div class="card-right">
      <div class="front card-page">
        <RightSide
          :width="cardWidth"
          :start-timestamp="cardClosedTimestamp"
        ></RightSide>
      </div>
      <div class="back card-page">easter egg - this side is never visible</div>
    </div>
  </div>
  <HappyBirthdayPopup :start-timestamp="cardOpenTimestamp" :width="cardWidth" />
  <TerrariaConfetti :start-timestamp="cardOpenTimestamp" />
</template>

<style scoped>
.card {
  --card-width: v-bind("cardWidth");
}
.card {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 200vmin;
  transform-style: preserve-3d;
  transform: rotateX(25deg) translateZ(-10vmin);
  user-select: none;
}
.card-left,
.card-right {
  position: relative;
  width: var(--card-width);
  height: calc(var(--card-width) * 1.4142);
  transform-style: preserve-3d;
}
.card-left {
  cursor: pointer;
}
.card-page {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.front {
  transform: translateZ(1px);
  backface-visibility: hidden;
}
.back {
  transform: translateZ(-1px) rotateY(180deg);
}
.card-left {
  transform-origin: right;
  transform: rotateY(170deg);
}
.card-left .back {
  background: url("@/assets/paper-texture-cropped.jpg"), #f6f6f6;
  background-size: cover;
}
.card-left .front {
  background: linear-gradient(
      to right,
      rgb(255, 255, 255, 10%) 0%,
      rgb(243, 243, 243, 30%) 70%,
      rgba(240, 240, 240, 0.6) 99%,
      rgba(219, 219, 219, 0.7) 100%
    ),
    url("@/assets/paper-texture-cropped.jpg"), #f6f6f6;
  background-size: cover;
}
.card-right .front {
  background: linear-gradient(
      to left,
      rgb(255, 255, 255, 10%) 0%,
      rgb(243, 243, 243, 30%) 70%,
      rgb(230, 230, 230, 60%) 99%,
      rgb(192, 192, 192, 70%) 100%
    ),
    url("@/assets/paper-texture-cropped.jpg"), #f6f6f6;
  background-size: cover;
  background-position: top;
}
.card-right {
  transform-origin: left;
  transform: translateX(-1px) rotateY(-5deg);
}
</style>
