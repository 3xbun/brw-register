<script setup>
const props = defineProps({
  cost: Number
})
</script>

<template>
    <div class="cost">
        <p class="total">
            {{ props.cost }}
        </p>
        <div class="hexagon"></div>
    </div>
</template>

<style scoped>
.cost {
    position: fixed;
    bottom: 4em;
    right: 2em;
    display: flex;
    justify-content: center;
    align-items: center;


  background-color: rgba(201, 164, 0, .2);
  backdrop-filter: blur(1.5em);
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

.total {
    position: fixed;
    font-size: 2rem;
    font-weight: bold;
}

.hexagon {
  --b: 3px; /* adjust to control the border  */
  height: 3.5em; /* adjust to control the size  */
  aspect-ratio: 1/cos(30deg);
  clip-path: 
    polygon(0 50%,50% -50%,100% 50%,50% 150%,0 50%,
    var(--b) 50%,
    calc(25% + var(--b)*cos(60deg)) calc(100% - var(--b)*sin(60deg)),
    calc(75% - var(--b)*cos(60deg)) calc(100% - var(--b)*sin(60deg)),
    calc(100% - var(--b)) 50%,
    calc(75% - var(--b)*cos(60deg)) calc(var(--b)*sin(60deg)),
    calc(25% + var(--b)*cos(60deg)) calc(var(--b)*sin(60deg)),
    var(--b) 50%);
  background: var(--primary-base-bg);
}
</style>