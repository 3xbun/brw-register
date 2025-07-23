<template>
    <div class="container">
        <h1>Campaigns</h1>
        <ul>
            <li v-for="cp in Campaigns">
                <img :src="'https://ndb.3xbun.com/' + cp.CampaignImage[0].path" :alt="cp.CampaignImage[0].title">
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
import { inject } from "vue";
const Campaigns = inject('Campaigns')
</script>

<style scoped>
ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

li {
    width: 30%;
    height: 25vh;
    border: 1px solid var(--primary-base-bg);
    border-radius: .5em;
    text-align: center;
    overflow: hidden;
}

img {
    margin-left: 50%;
    transform: translateX(-50%);
    height: 15vh;
}

.actions {
    display: flex;
    justify-content: center;
    gap: .5em;
}

.actions p{
    background-color: var(--primary-base-bg);
    padding: .25em;
    border-radius: .5em;
}
</style>