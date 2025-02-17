<template>
  <div class="loading">
    <img
      src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/14ce693b-68fb-49af-8ee4-749dda4c23fb/djvtka-47accee0-288c-480f-b821-87265f946fef.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE0Y2U2OTNiLTY4ZmItNDlhZi04ZWU0LTc0OWRkYTRjMjNmYlwvZGp2dGthLTQ3YWNjZWUwLTI4OGMtNDgwZi1iODIxLTg3MjY1Zjk0NmZlZi5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.6Au9o5URRa_9mhikIt-TI2VSyv6cNHmHfBdiz9MYCAU">
  </div>
</template>

<script setup>

</script>

<style scoped>
.loading {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading>img {
  width: 100%;
  max-width: 200px;
  margin-top: -10%;
  filter: hue-rotate(270deg) invert(1);
}
</style>