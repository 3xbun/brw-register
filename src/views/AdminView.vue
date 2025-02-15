<template>
  <div>
    <h1>PILOT ROSTER</h1>
    <Loading v-if="Users.length < 1" />
    <div class="users" v-else>
      <RouterLink v-for="user in Users" :to="'users/' + user.username">
        <div class="user">
          <div class="userProfile">
            <img :src="user.pilotImage" alt="">
          </div>
          <div class="userDetails">
            <h3 class="pilotName">{{ user.pilotName }}</h3>
            <p>> [ <strong>{{ user.mechName }}</strong> ]</p>
            <p>> STATUS: [ <strong class="status" :class="user.status">{{ status[user.status] }}</strong> ]</p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Loading from '../components/Loading.vue';

const Users = ref([])

const status = {
  "approved": "Approved",
  "disapproved": "Disapproved",
  "inreview": "In Review"
}

onMounted(() => {
  axios.get("https://n8n.3xbun.com/webhook/brw-api/users").then(res => Users.value = res.data
  )
})
</script>

<style scoped>
.users {
  width: 95%;
  margin: auto;
}

.user {
  width: 100%;
  display: flex;
  margin-bottom: 1em;
}

.userProfile {
  width: 30%;
  height: auto;
  aspect-ratio: 1;
  border: .5em double var(--primary-base-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

img {
  height: 100%;
}

.userDetails {
  width: 70%;
  background-color: var(--light-base-bg);
  margin-bottom: .5em;
  clip-path: polygon(100% 0, 100% 80%, 90% 100%, 0 100%, 0 0);
  -webkit-clip-path: polygon(100% 0, 100% 80%, 90% 100%, 0 100%, 0 0);
}


h3 {
  padding-left: .5em;
  width: 100%;
  background-color: var(--primary-base-bg);
  color: var(--primary-base-text);
  text-transform: uppercase;
}

p {
  padding-left: .5em;
  color: #9e9e9e;
}

strong {
  color: black;
}

.approved {
  color: #28A745
}

.disapproved {
  color: #DC3545
}

.inreview {
  color: #FFC107
}
</style>