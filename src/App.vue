<template>
  <div class="container">
    <Loading v-if="Users.length < 1" />
    <RouterView v-else />
  </div>
  <Footer />
</template>

<script setup>
import Footer from './components/Footer.vue';
import axios from 'axios';
import { onMounted, provide, ref } from 'vue';
import Loading from './components/Loading.vue';

const Users = ref([])
const Equipments = ref([])

provide('Users', Users)
provide('Equipments', Equipments)

onMounted(() => {
  if (localStorage.getItem("UsersDB")) {
    Users.value = JSON.parse(localStorage.getItem("UsersDB"))
  }

  if (localStorage.getItem("Equipments")) {
    Users.value = JSON.parse(localStorage.getItem("Equipments"))
  }

  axios.get("https://n8n.3xbun.com/webhook/brw-api/users").then(res => {
    Users.value = res.data
    localStorage.setItem("UsersDB", JSON.stringify(res.data))
  })

  axios.get("https://n8n.3xbun.com/webhook/brw-api/wne").then(res => {
    Equipments.value = res.data
    localStorage.setItem("Equipments", JSON.stringify(res.data))
  })
})
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding-bottom: 3em;
}
</style>