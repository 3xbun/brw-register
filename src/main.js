import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'

import PilotView from './views/PilotView.vue'
import MechView from './views/MechView.vue'
import AdminView from './views/AdminView.vue'
import RegisterView from './views/RegisterView.vue'

const routes = [
  { path: '/', component: AdminView },
  { path: '/register', component: RegisterView },
  { path: '/users/:username', component: PilotView },
  { path: '/users/:username/mech', component: MechView },
  { path: '/roster', component: AdminView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
