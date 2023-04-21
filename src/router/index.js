import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/auth/UserLogin.vue';
import Landing from '@/views/LandingPage.vue';
import UserDashboard from '@/views/UserDashboard.vue';
import CreatorDashboard from '@/views/CreatorDashboard.vue';
import store from '@/store';

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
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/me',
    name: 'UserDashboard',
    component: UserDashboard,
    meta : {
      requiresAuth: true
    }
  },
  {
    path: '/creator-dashboard',
    name: 'CreatorDashboard',
    component: CreatorDashboard,
    meta : {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;
  if (isLoggedIn && to.path === '/') {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
