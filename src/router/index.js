import { createRouter, createWebHistory } from 'vue-router';
import CreatorDashboard from '../components/CreatorDashboard.vue';
import CreatorSearch from '../components/CreatorSearch.vue';
import Register from '../components/UserRegister.vue';
import Login from '../components/UserLogin.vue';
import Landing from '../views/LandingPage.vue';

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: '/dashboard/:creatorId',
    name: 'CreatorDashboard',
    component: CreatorDashboard,
  },
  {
    path: '/search',
    name: 'Search',
    component: CreatorSearch,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
