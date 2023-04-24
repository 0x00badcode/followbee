import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/auth/UserLogin.vue';
import Landing from '@/views/LandingPage.vue';
// import CreatorDashboard from '@/views/CreatorDashboard.vue';
import DynamicDashboard from '@/views/DynamicDashboard.vue';
import store from '@/store';

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  // {
  //   path: '/dashboard/:creatorId',
  //   name: 'CreatorDashboard',
  //   component: CreatorDashboard,
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/me',
    name: 'DynamicDashboard',
    component: DynamicDashboard,
    meta : {
      requiresAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;
  if (!isLoggedIn && to.path == '/me') {
    next('/');
  } else if (isLoggedIn && to.path === '/') {
    next('/me');
  } else {
    next();
  }
});

export default router;
