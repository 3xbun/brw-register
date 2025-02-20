<template>
  <div class="content">
    <div id="header">
      <div class="profileImg">
        <img :src="User.mechImage" alt="">
      </div>
      <br>
      <Swapper active="mech" :username="User.username" />
    </div>

    <section id="name">
      <h1>{{ User.mechName }}</h1>
    </section>

    <section id="cost">
      <p>COST</p>
      <h1>{{ mechCost }}</h1>
    </section>

    <section id="name">
      <h2>Body [{{ EquipmentsSearch(User.mechBody).cost }}]</h2>
      <div class="item">
        <p class="title">{{ EquipmentsSearch(User.mechBody).name }} [{{ EquipmentsSearch(User.mechBody).cost }}]</p>
        <div class="desc">
          <ul>
            <li v-for="detail in EquipmentsSearch(User.mechBody).DETAIL.split(',')">
              {{ detail }}
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section id="name">
      <h2>Propulsion [{{ User.mechProp }}]</h2>
    </section>
    <section id="name">
      <h2>Weapons & Equipments</h2>
      <div class="item" v-for="item in User.mechWE.split(',')">
        <p class="title">
          {{ EquipmentsSearch(item).name }} [{{ EquipmentsSearch(item).cost }}] -
          <span class="icons">
            {{ EquipmentsSearch(item).category }}
          </span>
        </p>
        <div class="desc">
          <ul>
            <li v-for="detail in EquipmentsSearch(item).DETAIL.split(',')"
              v-if="EquipmentsSearch(item).DETAIL.split(',')[0] != ''">
              {{ detail }}
            </li>
          </ul>
        </div>
      </div>
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

const Equipments = inject('Equipments')

const EquipmentsSearch = (id) => {
  return Equipments.value.filter(e => e.ID == id)[0]
}

const mechCost = computed(() => {
  let cost = 0

  cost += Number(EquipmentsSearch(User.value.mechBody).cost) + Number(User.value.mechProp)

  User.value.mechWE.split(',').forEach(item => {
    cost += Number(EquipmentsSearch(item).cost)
  });

  return cost
})
</script>

<style scoped>
#header {
  background-color: var(--primary-base-bg);
  color: var(--primary-base-text);
  padding: 1.5em 1em 1em;
  text-align: center;
}

#name h1,
#name h2 {
  background-color: var(--primary-base-bg);
  color: var(--primary-base-text);
  width: max-content;
  padding: 0 2em 0 1em;
  margin-top: 1em;
  clip-path: polygon(100% 0, 100% 60%, 90% 100%, 0 100%, 0 0);
  -webkit-clip-path: polygon(100% 0, 100% 60%, 90% 100%, 0 100%, 0 0);
}

#name h2 {
  font-size: 1em;
}

#cost {
  background-color: var(--primary-base-bg);
  color: var(--primary-base-text);
  width: 5em;
  height: 5em;
  position: fixed;
  right: 5%;
  bottom: 5%;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
  -webkit-clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}

#cost p {
  font-size: .8em;
  margin-bottom: -.5em;
}

#cost h1 {
  font-size: 2.5em;
  margin-bottom: -.25em;
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

.item {
  margin-top: 1em;
  margin-left: 1em;
  border: 1px solid var(--primary-base-bg);
  padding: 1em;
  border-radius: .5em;
}

.title {
  color: var(--primary-base-bg);
  font-weight: bold;
}

.icons {
  color: var(--secondary-base-bg);
  display: inline-flex;
  gap: .2em;
}
</style>