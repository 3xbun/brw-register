<template>
  <div class="container">
    <RouterView />
  </div>
  <Footer />
</template>

<script setup>
import Footer from './components/Footer.vue';

</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding-bottom: 3em;
}
</style>