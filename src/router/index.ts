import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Join from '../views/Join.vue'
import Messenger from "@/views/Messenger.vue";

const routes = [
  {path: '/', name: 'Home', component: Login},
  {path: '/login', name: 'Login', component: Login},
  {path: '/join', name: 'Join', component: Join},
  {path: '/messenger', name: 'Messenger', component: Messenger},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
