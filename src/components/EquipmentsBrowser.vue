<template>
  <div class="browser">
    <header>
      <h1>ส่วนใส่อุปกรณ์</h1>
      <i class="fa-duotone fa-solid fa-xmark" @click="showBrowser = false"></i>
    </header>
    <input type="text" placeholder="ค้นหาอุปกรณ์" v-model="searchText">
    <select name="equipment" id="equipment" v-model="selectedEquipment">
      <option v-for="item in WnEFilterd" :value="item.Id">
        {{ item.Name }} ({{ item.Year }})
      </option>
    </select>
    <div class="desc" v-if="selectedEquipment">
      <h2>
        {{WnE.find(item => item.Id === selectedEquipment).Name}}
        ({{WnE.find(item => item.Id === selectedEquipment).Year}})
      </h2>
      <hr>

      <div class="stats">
        <div class="stat">
          <span>
            <i class="fa-duotone fa-solid fa-gear"></i>
            <strong>
              {{WnE.find(item => item.Id === selectedEquipment).Cost}}
            </strong>
          </span>
          COST
        </div>

        <div class="stat">
          <span>
            <i class="fa-duotone fa-solid fa-star"></i>
            <strong>
              {{WnE.find(item => item.Id === selectedEquipment).Tier}}
            </strong>
          </span>
          TIER
        </div>

        <div class="stat">
          <span v-if="WnE.find(item => item.Id === selectedEquipment).Time == -1">
            <i class="fa-duotone fa-solid fa-infinity"></i>
          </span>
          <span v-else>
            <i class="fa-duotone fa-solid fa-xmark"></i>
            <strong>
              {{WnE.find(item => item.Id === selectedEquipment).Time}}
            </strong>
          </span>
          TIME
        </div>
      </div>

      <div class="tags">
        <p class="tag" v-for="tag in WnE.find(item => item.Id === selectedEquipment).Category.split(',')">
          {{ tag }}
        </p>
      </div>

      <h3>รายละเอียด</h3>
      <p>{{WnE.find(item => item.Id === selectedEquipment).Details}}</p>

      <div v-if="WnE.find(item => item.Id === selectedEquipment).Link != null" class="link">
        <ul>
          <li v-for="link in WnE.find(item => item.Id === selectedEquipment).Link.split(',')"
            @click="selectedEquipment = Number(link)">
            <i class="fa-duotone fa-regular fa-up-right-and-down-left-from-center"></i> {{WnE.find(item => item.Id ===
              Number(link)).Name}}
          </li>
        </ul>
      </div>

      <div class="equippedBtn btn" @click="unequip(selectedEquipment)"
        v-if="User.mechWe.includes(selectedEquipment) || User.mechAug.includes(selectedEquipment)">
        สวมใส่
        {{WnE.find(item => item.Id === selectedEquipment).Name}}
        แล้ว
      </div>
      <div class="equipBtn btn" @click="equip(selectedEquipment)" v-else>
        สวมใส่
        {{WnE.find(item => item.Id === selectedEquipment).Name}}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue';
import axios from 'axios';

const WnE = ref([]);
const searchText = ref('');
const WnEFilterd = computed(() => WnE.value.filter(item => item.Name.startsWith(searchText.value)))

const selectedEquipment = ref('');
const showBrowser = inject('showBrowser')
const User = inject('User')

const equip = (id) => {
  const item = WnE.value.filter(item => item.Id === Number(id))[0]
  console.log(item.Type);
  console.log(User.value.mechAug);

  if (item.Type.startsWith("Augmented Parts")) {
    User.value.mechAug.push(item.Id)
  } else {
    User.value.mechWe.push(item.Id)
  }
}

onMounted(() => {
  const options = {
    method: 'GET',
    url: 'https://ndb.3xbun.com/api/v2/tables/ms3smpad87j9249/records',
    params: { offset: '0', limit: '999', where: '', viewId: 'vwc4q14hzqmxkbxb' },
    headers: {
      'xc-token': 'HZvUQ_SAWh6C0BRpd36SNhTSzLGizMgCxJShzghS'
    }
  };

  axios
    .request(options)
    .then(res => WnE.value = res.data.list)
    .catch(err => console.error(err));
})
</script>

<style scoped>
.browser {
  position: fixed;
  max-width: 600px;
  width: 85vw;
  left: 0;
  right: 0;
  margin: auto;
  top: 5em;
  bottom: 0;
  padding: 1em;
  border-radius: .5em;
  overflow: scroll;

  background-color: rgba(100, 100, 100, .1);
  backdrop-filter: blur(1.5em);
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

header i {
  font-size: 2em;
}

h2 {
  display: flex;
  align-items: center;
  gap: 1em;
}

.tags {
  font-size: .8em;
  display: flex;
  gap: 1em;
  justify-content: center;
  margin: 1em 0;
}

input,
select {
  font-size: inherit;
  padding: .5em;
  border: 1px solid #a1a1a1;
  border-radius: .5em;
  width: 100%;
  margin-bottom: 1em;
}

hr {
  border: 1px solid gray;
}

.tag {
  background-color: var(--primary-base-bg);
  padding: .25em .5em;
  border-radius: .5em;
}

.stats {
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

.btn {
  border: 1px solid var(--primary-base-bg);
  padding: .25em 1em;
  border-radius: .5em;
  width: max-content;
  text-align: center;
  margin: 1em auto;
}
</style>