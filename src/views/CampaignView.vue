<template>
    <div class="container">
        <h1>Campaigns</h1>
        <ul>
            <li v-for="cp in Campaigns">
                <img :src="cp.image" alt="">
                <h4>
                    {{ cp.title }}
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
const Campaigns = [
    {
        title: "Operation: Iron Nova",
        image: "https://i.ytimg.com/vi/LqtXiDxohtE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAd8Ur9PIG-ex-nKcLQZextB2UynA"
    },
    {
        title: "Zeon’s Last Ember",
        image: "https://vignette.wikia.nocookie.net/gundam/images/e/e7/GPF_Operation_Odessa.jpg/revision/latest?cb=20190729143112"
    },
    {
        title: "Crimson Stardust Protocol",
        image: "https://media.mmorpg.com/images/heroes/news/43897.jpg"
    }
]
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