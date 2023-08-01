<script setup lang="ts"></script>

<template>
  <div class="happy-birthday-message">
    <div>
      <h1>
        <img
          src="@/assets/terraria-happy-birthday.png"
          alt="Happy Birthday!"
          class="happy-birthday-image"
        />
      </h1>
      <h2 class="happy-birthday-message-subtitle"></h2>
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

  /* Fade in and scale up */
  opacity: 0;
  transform: translateY(0px) scale(1);
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
