<template>
  <div class="container">
    <h1>ลงทะเบียนพลขับใหม่</h1>

    <form @submit.prevent="">
      <h2>ข้อมูลพื้นฐาน</h2>
      <input type="text" placeholder="ชื่อผู้ใช้" v-model="User.username">
      <input type="text" placeholder="ชื่อพลขับ" v-model="User.pilotName">
      <input type="text" placeholder="ลิงก์รูปภาพพลขับ" v-model="User.pilotImage">
      <div class="pilotImage">
        <img v-if="User.pilotImage" :src="User.pilotImage">
        <img v-else src="https://banffventureforum.com/wp-content/uploads/2019/08/no-photo-icon-22.png">
      </div>

      <h2>STATS</h2>
      <div class="stats">
        <div class="stat">
          <i class="fa-duotone fa-solid fa-hand-fist"></i>
          <p>Melee</p>
          <input type="text" v-model="User.pilotMelee">
        </div>
        <div class="stat">
          <i class="fa-duotone fa-solid fa-crosshairs"></i>
          <p>Shoot</p>
          <input type="text" v-model="User.pilotShoot">
        </div>
        <div class="stat">
          <i class="fa-duotone fa-solid fa-rotate-reverse"></i>
          <p>Reaction</p>
          <input type="text" v-model="User.pilotReaction">
        </div>
        <div class="stat">
          <i class="fa-duotone fa-solid fa-eye"></i>
          <p>Psychic</p>
          <input type="text" v-model="User.pilotPsychic">
        </div>
      </div>

      <h2>นิยามตัวละคร [{{ background }}]</h2>
      <ul>
        <li v-for="(bg, index) in User.pilotBG">
          {{ bg.name }} [{{ bg.cost }}]
          <i class="fa-duotone fa-solid fa-xmark" @click="User.pilotBG.splice(index, 1);"></i>
        </li>
      </ul>
      <div class="pilotBG">
        <input type="text" placeholder="นิยามตัวละคร" v-model="pilotBG.name">
        <input type="text" placeholder="0" v-model="pilotBG.cost" @keypress.enter="addBG()">
      </div>
      <p class="btn" @click="addBG()">เพิ่ม</p>

      <h2>หุ่น</h2>
      <input type="text" placeholder="ชื่อหุ่น" v-model="User.mechName">
      <input type="text" placeholder="ลิงก์รูปภาพพลขับ" v-model="User.mechImage">
      <div class="pilotImage">
        <img v-if="User.mechImage" :src="User.mechImage">
        <img v-else src="https://banffventureforum.com/wp-content/uploads/2019/08/no-photo-icon-22.png">
      </div>
      <div class="option">
        <p>BODY: </p>
        <select v-model="User.mechBody">
          <option v-for="item in Body" :value="item.ID">{{ item.name }} [{{ item.cost }}]</option>
        </select>
      </div>

      <h2>ยุทโธปกรณ์</h2>
      <div class="item" v-for="item in User.mechWE.split(',').slice(0, -1)">
        <p class="title">
          <i class="fa-duotone fa-solid fa-xmark" @click="removeItem(item)"></i>
          {{ getItem(item).name }} [{{ getItem(item).cost }}] -
          <span class="icons">
            [{{ getItem(item).category }}]
          </span>
        </p>
        <div class="desc">
          <ul>
            <li v-for="i in getItem(item).DETAIL.split(',')"> -
              {{ i }}
            </li>
          </ul>
        </div>
      </div>
      <input type="text" placeholder="ค้นหายุทโธปกรณ์" v-model="searchText">
      <ul class="equipment">
        <li v-for="item in Equipment">
          {{ item.name }} [{{ item.cost }}]
          <i class="fa-solid fa-plus" @click="User.mechWE += `${item.ID},`"></i>
        </li>
      </ul>

      <div class="regisBtn">
        <Loading class="loading" v-if="isLoad" />
        <button class="active" @click="register()">ลงทะเบียน</button>
      </div>
    </form>

    <p class="result" :class="{ success: result == 200 ? true : false }" v-if="result">
    <div v-if="result == 200">ลงทะเบียนสำเร็จ</div>
    <div v-else>
      {{ result }}
    </div>
    </p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

import Loading from '../components/Loading.vue';

const isLoad = ref(false)

const WnE = ref([])

const searchText = ref('')
const Body = computed(() => WnE.value.filter(item => item.type == 'Augmented Parts [Body]'))
const Equipment = computed(() => WnE.value.filter(item => item.type != 'Augmented Parts [Body]').filter(item => item.name.startsWith(searchText.value)).slice(0, 5))

const getItem = (id) => WnE.value.filter(item => item.ID == id)[0]
const removeItem = (id) => { User.value.mechWE = User.value.mechWE.replace(id + ',', ''); }

const User = ref({
  username: "",
  pilotName: "",
  pilotImage: "",
  pilotMelee: "",
  pilotShoot: "",
  pilotReaction: "",
  pilotPsychic: "",
  pilotBG: [],
  mechName: "",
  mechImage: "",
  mechBody: "",
  mechProp: "",
  mechWE: "",
  status: ""
})

const result = ref("")

const pilotBG = ref({
  name: "",
  cost: ""
})

const background = computed(() => {
  let total = 0
  User.value.pilotBG.forEach(bg => {
    total += Number(bg.cost)
  });

  return total
})

const addBG = () => {
  User.value.pilotBG.push(pilotBG.value)
  pilotBG.value = {
    name: "",
    cost: ""
  }
}

const register = () => {
  isLoad.value = true
  const payload = JSON.parse(JSON.stringify(User.value))
  payload.pilotBG = JSON.stringify(payload.pilotBG)
  axios.post("https://n8n.3xbun.com/webhook/brw-api/register", payload).then(res => { result.value = res.status; isLoad.value = false }).catch(err => { result.value = err; isLoad.value = false })
}

onMounted(() => {
  axios.get("https://n8n.3xbun.com/webhook/brw-api/wne").then(res => {
    WnE.value = res.data
  })
})
</script>

<style scoped>
.container {
  margin: 1em;
}

h1 {
  background-color: var(--primary-base-bg);
  color: var(--primary-base-text);
  text-align: center;
}

h2 {
  background-color: var(--primary-base-bg);
  color: var(--primary-base-text);
  padding: .5em 0em .5em 1em;
  width: 80%;
  font-size: 1em;
  clip-path: polygon(100% 0, 100% 60%, 93% 100%, 0 100%, 0 0);
  -webkit-clip-path: polygon(100% 0, 100% 60%, 93% 100%, 0 100%, 0 0);
}

form {
  padding: 1em 0;
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 95%;
  margin: auto;
}

input,
select {
  font-size: inherit;
  padding: .5em;
  border: 1px solid #a1a1a1;
  border-radius: .5em;
}

input:focus {
  outline: 3px solid var(--primary-base-bg);
  border: 1px solid #a1a1a1;
}

button {
  background-color: #d6d6d6;
  color: rgba(0, 0, 0, 0.25);
  border: none;
  padding: .25em 1em;
  font-size: 1.5em;
  border-radius: .5em;
  width: max-content;
}

.active {
  background-color: var(--primary-base-bg);
  color: var(--primary-base-text);
}

.pilotImage {
  width: 70%;
  height: auto;
  aspect-ratio: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1em double var(--primary-base-bg);
  margin: 1em auto;
}

img {
  height: 100%;
}

.stats {
  display: flex;
}

.stat {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: .5em;
}

.stat input {
  font-size: 2em;
  text-align: center;
  width: 2em;
  height: 2em;
}

i {
  font-size: 2em;
}

.pilotBG {
  display: flex;
  width: 100%;
  gap: 1em;
}

.pilotBG input:first-child {
  width: 80%;
}

.pilotBG input:last-child {
  width: 20%;
  text-align: center;
}

.btn {
  border: 1px solid rgb(0, 200, 83);
  color: rgb(0, 200, 83);
  padding: .25em 1em;
  border-radius: .5em;
  width: max-content;
  text-align: center;
  margin: auto;
}

ul {
  margin-left: 1.5em;
}

li {
  display: flex;
  align-items: center;
  gap: .5em;
  list-style: inside;
}

i {
  font-size: 1em;
}

.result {
  width: 80%;
  text-align: center;
  margin: auto;
  color: var(--primary-base-text);
  border-radius: .5em;
  padding: .5em 1em;
  background-color: #c52d36;
}

.success {
  background-color: #08964b;
}

.regisBtn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.loading {
  width: 20%;
}

.option {
  display: flex;
  align-items: center;
}

.option p {
  width: 20%;
  color: var(--primary-base-bg);
  font-weight: bold;
}

.option select {
  width: 100%;
}

.equipment i {
  color: var(--primary-base-bg)
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