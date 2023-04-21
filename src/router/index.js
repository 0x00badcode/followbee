import { createRouter, createWebHistory } from 'vue-router';
import CreatorSearch from '@/components/CreatorSearch.vue';
import UserRegister from '@/components/auth/UserRegister.vue';
import CreatorRegister from '@/components/auth/CreatorRegister.vue';
import Login from '@/components/auth/UserLogin.vue';
import Landing from '@/views/LandingPage.vue';
import Quest from '@/components/SingleQuest';
import QuestList from '@/components/QuestList.vue';
import QuestForm from '@/components/QuestForm.vue';
import QuestDetails from '@/components/QuestDetails.vue';
import QuestPage from '@/components/QuestPage.vue';
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
    path: '/search',
    name: 'Search',
    component: CreatorSearch,
  },
  {
    path: '/UserRegister',
    name: 'Register',
    component: UserRegister,
  },
  {
    path: '/CreatorRegister',
    name: 'Register',
    component: CreatorRegister,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/user-dashboard',
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
  },
  {
    path: '/quests/:questId',
    name: 'Quest',
    component: Quest,
  },
  {
    path: '/quests',
    component: QuestPage,
    children: [
      {
        path: ':creatorId',
        name: 'QuestList',
        component: QuestList,
      },
      {
        path: ':questId/edit',
        name: 'QuestForm',
        component: QuestForm,
      },
      {
        path: ':questId',
        name: 'QuestDetails',
        component: QuestDetails,
      },
    ],
  },
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
