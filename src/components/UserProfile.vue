<template>
  <div class="user-profile">
    <div class="user-info" @click="toggleDropdown">
      <img :src="profilePicture" alt="User Profile" class="profile-picture" />
      <div class="username">{{ username }}</div>
    </div>
    <transition name="dropdown">
      <div class="dropdown-menu" v-if="showDropdown">
        <div class="user-details">
          <p><strong>Email:</strong> {{ email }}</p>
          <!-- Add more user details if needed -->
        </div>
        <button @click="$emit('switch-profile')" class="switch-mode-button">
          Switch to {{ loginType === 'creator' ? 'User' : 'Creator' }} Mode
        </button>

        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  props: {
    profilePicture: {
      type: String,
      default: "https://via.placeholder.com/50",
    },
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    ...mapState(['username', 'email', 'loginType']),
  },
  async mounted() {
    await this.getUserInfo();
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      localStorage.removeItem('token');
      this.$store.dispatch('setAuthStatus', false);
      this.$router.push('/');
      this.showDropdown = false;
    },
    changeLoginType() {
      if (this.loginType === 'creator') {
        this.setLoginType('user');
      } else {
        this.setLoginType('creator');
      }
    },
    ...mapActions(['getUserInfo']),
    ...mapMutations(['setLoginType']),
  },
};
</script>

<style scoped>
/* Add your styles */
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
