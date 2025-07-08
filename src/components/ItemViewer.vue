<template>
  <div class="viewer">
    <header>
      <h1>{{ props.item.Name }} ({{ props.item.Year }})</h1>
      <i class="fa-duotone fa-solid fa-xmark" @click="showItem = false"></i>
    </header>
    <hr>

    <div class="stats">
      <div class="stat">
        <span>
          <i class="fa-duotone fa-solid fa-gear"></i>
          <strong>
            {{ props.item.Cost }}
          </strong>
        </span>
        COST
      </div>

      <div class="stat">
        <span>
          <i class="fa-duotone fa-solid fa-star"></i>
          <strong>
            {{ props.item.Tier }}
          </strong>
        </span>
        TIER
      </div>

      <div class="stat">
        <span v-if="props.item.Time == -1">
          <i class="fa-duotone fa-solid fa-infinity"></i>
        </span>
        <span v-else>
          <i class="fa-duotone fa-solid fa-xmark"></i>
          <strong>
            {{ props.item.Time }}
          </strong>
        </span>
        TIME
      </div>
    </div>

    <div class="tags">
      <p class="tag" v-for="tag in props.item.Category.split(',')">
        {{ tag }}
      </p>
    </div>

    <h3>รายละเอียด</h3>
    <ul>
      <li v-for="item in props.item.Details.split(',')">
        - {{ item }}
      </li>
    </ul>


    <div v-if="props.item.Link != null" class="link">
      <ul>
        <li v-for="link in props.item.Link.split(',')" @click="selectedEquipment = Number(link)">
          <i class="fa-duotone fa-regular fa-up-right-and-down-left-from-center"></i> {{WnE.find(item => item.Id ===
            Number(link)).Name}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const props = defineProps({
  item: Object
})

const showItem = inject('showItem')
const WnE = inject('WnE')
const selectedEquipment = inject('selectedEquipment')
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

header i {
  font-size: 2em;
}

.viewer {
  position: fixed;
  max-width: 600px;
  width: 85vw;
  left: 0;
  right: 0;
  margin: auto;
  padding: 1em;
  border-radius: .5em;

  background-color: rgba(100, 100, 100, .1);
  backdrop-filter: blur(1.5em);
}

.stats {
  margin: 1em;
  display: flex;
  gap: 2em;
  justify-content: center;
}

.stat {
  text-align: center;
}

.stat span {
  display: flex;
  align-items: center;
  font-size: 2em;
  gap: .25em;
  height: 1.5em;
}

.tags {
  font-size: .8em;
  display: flex;
  gap: 1em;
  justify-content: center;
  margin: 1em 0;
}

.tag {
  background-color: var(--primary-base-bg);
  padding: .25em .5em;
  border-radius: .5em;
}

.link {
  cursor: pointer;
}
</style>