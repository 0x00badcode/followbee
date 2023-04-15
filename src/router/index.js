import { createRouter, createWebHistory } from 'vue-router';
import CreatorDashboard from '@/components/CreatorDashboard.vue';
import CreatorSearch from '@/components/CreatorSearch.vue';
import Register from '@/components/UserRegister.vue';
import Login from '@/components/UserLogin.vue';
import Landing from '@/views/LandingPage.vue';
import Quest from '@/components/SingleQuest';
import QuestList from '@/components/QuestList.vue';
import QuestForm from '@/components/QuestForm.vue';
import QuestDetails from '@/components/QuestDetails.vue';
import QuestPage from '@/components/QuestPage.vue';

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

export default router;
