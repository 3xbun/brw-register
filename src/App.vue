<template>
  <div class="container">
    <!-- <Loading v-if="Users.length < 1" /> -->
    <RouterView />
  </div>
  <Footer />
</template>

<script setup>
import Footer from './components/Footer.vue';
import axios from 'axios';
import { onMounted, provide, ref } from 'vue';
import Loading from './components/Loading.vue';

const Users = ref([])
const WnE = ref([])
const Campaigns = ref([])

provide('Users', Users)
provide('WnE', WnE)
provide('Campaigns', Campaigns)

const getCampaign = () => {
  const options = {
    method: 'GET',
    url: 'https://ndb.3xbun.com/api/v2/tables/mixqd2vuup0u34e/records',
    params: { offset: '0', limit: '25', where: '', viewId: 'vwitihmuxeam4xhe' },
    headers: {
      'xc-token': 'G85Gjz-nXv6tsl2Y_7se6dAgeTVOjlyinz1cQKOU'
    }
  };

  axios
    .request(options)
    .then(res => Campaigns.value = res.data.list)
    .catch(err => console.error(err));
}

const getWnE = () => {
  const options = {
    method: 'GET',
    url: 'https://ndb.3xbun.com/api/v2/tables/mzps7862w38hz1j/records',
    params: { offset: '0', limit: '999', where: '', viewId: 'vwta9c9j6hl1yzur' },
    headers: {
      'xc-token': 'G85Gjz-nXv6tsl2Y_7se6dAgeTVOjlyinz1cQKOU'
    }
  };

  axios
    .request(options)
    .then(res => {
      WnE.value = res.data.list;
      localStorage.setItem('WnE', JSON.stringify(WnE.value))
    })
    .catch(err => console.error(err));
}

onMounted(() => {
  if (localStorage.getItem("Users")) {
    Users.value = JSON.parse(localStorage.getItem("Users"))
  }

  if (localStorage.getItem("WnE")) {
    WnE.value = JSON.parse(localStorage.getItem("WnE"))
  }

  getWnE()
  getCampaign()
})
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding-bottom: 3em;
}
</style>