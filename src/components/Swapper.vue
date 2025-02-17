<template>

  <div class="swapper">
    <RouterLink :to="`/users/${props.username}/mech`" replace>
      <div class="icon" :class="{ active: props.active == 'mech' ? true : false }">
        <i class="fa-duotone fa-solid fa-starship-freighter"></i>
      </div>
    </RouterLink>

    <RouterLink :to="`/users/${props.username}`" replace>
      <div class="icon" :class="{ active: props.active == 'pilot' ? true : false }">
        <i class="fa-duotone fa-solid fa-user-pilot"></i>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
const props = defineProps({
  active: String,
  username: String
})
</script>

<style scoped>
.swapper {
  display: flex;
  justify-content: center;
  gap: 1em;
  padding: .5em 0;
}

.icon {
  border: 1px solid;
  height: 1.5em;
  width: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  border-radius: 50%;
  color: #B88E00;
}

.active {
  color: var(--primary-base-text);
}
</style>