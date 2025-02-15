<template>
  <div class="step">
    <ul>
      <li>1</li>
      <hr>
      <li>2</li>
      <hr>
      <li>3</li>
      <hr>
      <li>4</li>
      <hr>
      <li>5</li>
    </ul>
  </div>
</template>

<script setup>

</script>

<style scoped>
.step {
  padding: 1em 0;
}

.step ul {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  gap: .5em;
}

li {
  background-color: #979797;
  width: 1.5em;
  height: 1.5em;
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

hr {
  width: 10%;
  border-bottom: 1px solid rgba(0, 0, 0, .12);
}
</style>