<template>
  <Loading v-if="!User.username" />
  <div class="content" v-else>
    <div id="header">
      <div class="profileImg">
        <img :src="User.pilotImage" alt="">
      </div>
      <h1>
        {{ User.pilotName }}
      </h1>
      <Swapper active="pilot" :username="User.username" />
    </div>

    <section>
      <h3>นักบิน <span>[5]</span></h3>
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
      <h3>นิยามตัวละคร <span>[5]</span></h3>
      <ul>
        <li>Shooter [2]</li>
        <li>พลังมิตรภาพ [2]</li>
        <li>ตะโกน [1]</li>
      </ul>
    </section>

    <section>
      <h3>ทักษะ <span></span></h3>
    </section>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router'

import Swapper from '../components/Swapper.vue';
import Loading from '../components/Loading.vue';

const route = useRoute()
const User = ref({})

onBeforeMount(() => {
  axios.get("https://n8n.3xbun.com/webhook/50d8213b-f36f-443a-92c9-2f0d0246effa/brw-api/user/" + route.params.username).then(res => {
    User.value = res.data[0]
  })
})
</script>

<style scoped>
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