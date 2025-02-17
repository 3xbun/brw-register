<template>
  <footer>
    Ready2Play Companion v{{ version }}
  </footer>
</template>

<script setup>
import { version } from '../../package.json';
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: .5em 0;
  background-color: var(--primary-base-bg);
}
</style>