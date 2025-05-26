<template>
    <div class="container">
        <h1>Campaigns</h1>
        <ul>
            <li v-for="cp in Campaigns">
                <img :src="cp.ImageLink" alt="">
                <h4>
                    {{ cp.Title }}
                </h4>
                <div class="actions">
                    <RouterLink to="/roster">
                        <p>ดู Sheet</p>
                    </RouterLink>

                    <RouterLink to="/register">
                        <p>ลงทะเบียน</p>
                    </RouterLink>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import axios  from "axios";
const Campaigns = ref([])

import { onMounted, ref } from 'vue';

onMounted(() => {
      const options = {
    method: 'GET',
  url: 'https://ndb.3xbun.com/api/v2/tables/mzyn92ajxgok59i/records',
    params: { offset: '0', limit: '999', where: '', viewId: 'vwr3n7yv72omjgph' },
    headers: {
      'xc-token': 'HZvUQ_SAWh6C0BRpd36SNhTSzLGizMgCxJShzghS'
    }
  };

  axios.request(options).then(function (res) {
    console.log(res.data);

    Campaigns.value = res.data.list;
  }).catch(function (error) {
    console.error(error);
  });
})
</script>

<style scoped>
ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

li {
    width: 30%;
    height: 25vh;
    border: 1px solid var(--primary-base-bg);
    text-align: center;
    position: relative;
}

img {
    width: 100%;
}

.actions {
    display: flex;
    justify-content: flex-end;
    gap: .5em;
    position: absolute;
    bottom: 0;
    right: 0;
}

.actions p{
    background-color: var(--primary-base-bg);
    padding: .25em;
}
</style>