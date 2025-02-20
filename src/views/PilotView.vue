<template>
  <div class="content">
    <div id=" header">
      <div class="profileImg">
        <img :src="User.pilotImage" alt="">
      </div>
      <h1>
        {{ User.pilotName }}
      </h1>
      <Swapper active="pilot" :username="User.username" />
    </div>

    <section>
      <h3>นักบิน <span>[{{ pilotCost }}]</span></h3>
      <table>
        <tbody>
          <tr>
            <td><i class="fa-duotone fa-solid fa-hand-fist"></i>Melee</td>
            <td>[{{ User.pilotMelee }}]</td>
          </tr>
          <tr>
            <td><i class="fa-duotone fa-solid fa-crosshairs"></i>Shoot</td>
            <td>[{{ User.pilotShoot }}]</td>
          </tr>
          <tr>
            <td><i class="fa-duotone fa-solid fa-rotate-reverse"></i>Reaction</td>
            <td>[{{ User.pilotReaction }}]</td>
          </tr>
          <tr>
            <td><i class="fa-duotone fa-solid fa-eye"></i>Psychic</td>
            <td>[{{ User.pilotPsychic }}]</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h3>นิยามตัวละคร <span>[{{ pilotBGCost }}]</span></h3>
      <ul>
        <li v-for="bg in JSON.parse(User.pilotBG)">{{ bg.name }} [{{ bg.cost }}]</li>
      </ul>
    </section>

    <section>
      <h3>ทักษะ <span></span></h3>
    </section>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { useRoute } from 'vue-router'

import Swapper from '../components/Swapper.vue';

const route = useRoute()
const Users = inject('Users')
const User = computed(() => Users.value.filter(user => user.username == route.params.username)[0])

const pilotCost = computed(() => {
  const u = User.value

  return u.pilotMelee + u.pilotShoot + u.pilotReaction + u.pilotPsychic
})

const pilotBGCost = computed(() => {
  const bg = JSON.parse(User.value.pilotBG)
  let total = 0
  bg.forEach(b => {
    total += Number(b.cost)
  });

  return total
})
</script>

<style style scoped>
#header {
  background-color: var(--primary-base-bg);
  color: var(--primary-base-text);
  padding: 1.5em 1em .5em;
  text-align: center;
}

.profileImg {
  width: 90%;
  height: auto;
  aspect-ratio: 1;
  margin: auto;
  overflow: hidden;
  border: .5em double #8a949e;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profileImg>img {
  height: 100%;
}

h3 {
  background-color: var(--secondary-base-bg);
  color: var(--primary-base-text);
  padding-left: 1em;
  width: 50%;
  margin: 1em 0 .5em;
}

h3>span {
  font-weight: 200;
  font-size: .8em;
}

table {
  padding: 0 1em;
  width: 100%;
}

tr {
  margin-bottom: .5em;
}

td {
  width: 100%;
}

td:first-child {
  gap: .5em;
  display: flex;
  align-items: center;
}

td:last-child {
  text-align: right;
}

td i {
  font-size: 2em;
  width: 30%;
}

ul {
  margin-left: 1.5em;
}

li {
  list-style: inside;
}
</style>