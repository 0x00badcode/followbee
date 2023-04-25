<template>
  <div class="user-profile">
    <div class="user-info" @click="toggleDropdown">
      <img :src="profilePicture" alt="User Profile" class="profile-picture" />
    </div>
    <transition name="dropdown">
      <div class="dropdown-menu" v-if="showDropdown">
        <div class="user-details">
          <p><strong>username:</strong> {{ username }}</p>
        </div>
        <button @click="switchProfile" class="switch-mode-button">
          Switch to {{ loginType === 'creator' ? 'User' : 'Creator' }} Mode
        </button>

        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </transition>
  </div>
</template>

<script>
import { useUserStore } from '@/store/userStore';

export default {
  props: {
    profilePicture: {
      type: String,
      default: "https://via.placeholder.com/50",
    },
  },
  setup() {
    const userStore = useUserStore();

    function toggleDropdown() {
      userStore.showDropdown = !userStore.showDropdown;
    }

    function logout() {
      localStorage.removeItem('token');
      userStore.setAuthStatus(false);
      userStore.$router.push('/');
      userStore.showDropdown = false;
      window.location.reload();
    }

    function switchProfile() {
      userStore.setLoginType(userStore.loginType === 'creator' ? 'user' : 'creator');
    }

    return {
      userStore,
      toggleDropdown,
      logout,
      switchProfile,
    };
  },
  computed: {
    showDropdown() {
      return this.userStore.showDropdown;
    },
    userProfile() {
      return this.userStore.userProfile;
    },
    loginType() {
      return this.userStore.loginType;
    },
    userId() {
      return this.userStore.userId;
    },
    username() {
      return this.userStore.username;
    },
  },
};
</script>

<style scoped>
.switch-mode-button {
  display: block;
  background-color: #aaa;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px 0;
  width: 100%;
}

.switch-mode-button:hover {
  background-color: #888;
}
</style>
