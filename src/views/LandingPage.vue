<template>
  <div class="landing">
    <header>
      <nav>
        <div class="search-container">
          <input
            type="text"
            v-model="searchQuery"
            @input="search"
            placeholder="Search Content Creators"
          />
          <div v-for="creator in contentCreators" :key="creator._id">
            <router-link :to="`/quests/${creator._id}`">{{ creator.username }}</router-link>
          </div>
        </div>
        <div v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
        </div>
        <div v-if="isLoggedIn">
          <button @click="logout">Log Off</button>
        </div>
      </nav>
    </header>
    <div class="name">
      <h1>FollowBee</h1>
    </div>
    <hr>
    <div>
      <h1>join as</h1>
    </div>
    <div class="cta-buttons">
      <button class="cta-button" @click="showUserPopup">User</button>
      <button class="cta-button" @click="showCreatorPopup">Content Creator</button>
    </div>
    <div class="popup" v-if="showPopup" @click.self="closePopup">
      <div class="popup-inner">
        <button class="close-button" @click="closePopup">X</button>
        <component :is="popupComponent"></component>
      </div>
    </div>
  </div>
</template>



<script>
import { mapState } from 'vuex';
import UserRegister from '../components/auth/UserRegister.vue';
import CreatorRegister from '../components/auth/CreatorRegister.vue';
import { searchContentCreators } from '@/api/apiFunctions';

export default {
  name: 'LandingPage',
  components: {
    UserRegister,
    CreatorRegister,
  },
  computed: {
    ...mapState(['isLoggedIn']),
  },
  data() {
    return {
      showPopup: false,
      popupComponent: null,
      searchQuery: '',
      contentCreators: [],
    };
  },
  methods: {
    showUserPopup() {
      this.showPopup = true;
      this.popupComponent = UserRegister;
    },
    showCreatorPopup() {
      this.showPopup = true;
      this.popupComponent = CreatorRegister;
    },
    closePopup() {
      this.showPopup = false;
      this.popupComponent = null;
    },
    logout() {
      localStorage.removeItem('token');
      this.$store.dispatch('setAuthStatus', false);
      this.$router.push('/login');
    },
    async search() {
      const response = await searchContentCreators(this.searchQuery);
      if (response.success) {
        this.contentCreators = response.data;
      } else {
        console.error('Failed to fetch content creators:', response.error);
      }
    },
  },
};
</script>


<style scoped>
.landing {
  text-align: center;
  padding: 20px;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.cta-button {
  text-decoration: none;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border-radius: 5px;
  font-size: 16px;
}

.name {
  font-size: 75px;
  font-weight: bold;
  margin: 10px 0;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-inner {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.close-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

header nav {
  display: flex;
  justify-content: space-around;
  background-color: #2c3e50;
  padding: 10px 0;
}

.search-container {
  position: relative;
}

.search-container input {
  padding: 0.5rem;
}

.search-container div {
  position: absolute;
  background-color: white;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

header nav a {
  color: white;
  text-decoration: none;
}

header nav a:hover {
  color: #3498db;
}

</style>