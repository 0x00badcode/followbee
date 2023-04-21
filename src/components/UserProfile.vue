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
                <button @click="logout" class="logout-button">Logout</button>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getUserInfo } from '@/api/apiFunctions';

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
      username: '',
      email: '',
    };
  },
  async mounted() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const response = await getUserInfo(userId, token);
    if (response.success) {
      this.username = response.data.username;
      this.email = response.data.email;
    }
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
    ...mapActions(['getUserInfo']),
  },
};
</script>

<style scoped>
.user-profile {
    position: relative;
}

.user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.profile-picture {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0; /* Change from 'left: 0' to 'right: 0' */
    background-color: white;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 250px;
    z-index: 10;
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.3s ease;
}

.dropdown-enter,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.logout-button {
    display: block;
    background-color: #42b983;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
    width: 100%;
}

.logout-button:hover {
    background-color: #2c3e50;
}
</style>
