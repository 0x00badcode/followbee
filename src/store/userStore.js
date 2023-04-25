import { defineStore } from 'pinia';
import api from '../api/api';

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    token: localStorage.getItem('token') || null,
    userProfile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
    userData: {},
    userId: localStorage.getItem('userId') || null,
    loginType: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    userProfile: (state) => state.userProfile,
    userData: (state) => state.userData,
    userId: (state) => state.userId,
    loginType: (state) => state.loginType,
    username: (state) => state.userData.username,
  },
  actions: {
    setAuthStatus(token) {
      if (token) {
        localStorage.setItem('token', token);
        this.token = token;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userProfile');
        this.token = null;
      }
    },
    setUserProfile(profile) {
      localStorage.setItem('userProfile', profile);
      this.userProfile = profile;
    },
    setUserId(userId) {
      localStorage.setItem('userId', userId);
      this.userId = userId;
    },
    setLoginType(loginType) {
      this.loginType = loginType;
    },
    setUserData(user) {
      this.userData = user;
    },
    async fetchUserData(userId) {
      try {
        const response = await api.get(`/user/${userId}`);
        const userData = response.data;
        this.userData = userData;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  },
});
