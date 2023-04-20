<template>
  <div id="app">
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
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { searchContentCreators } from '@/api/apiFunctions';

export default {
  computed: {
    ...mapState(['isLoggedIn']),
  },
  data() {
    return {
      loggedInUserId: '',
      isCreator: false,
      searchQuery: '',
      contentCreators: [],
    };
  },
  watch: {
    isLoggedIn: {
      async handler(newVal) {
        if (newVal) {
          // Fetch the necessary data, e.g., logged-in user's ID and role
          // Replace the following with your logic to fetch the user's information
          const loggedInUser = {}; // Fetch the user's information here
          this.loggedInUserId = loggedInUser._id;
          this.isCreator = loggedInUser.isCreator;
        }
      },
      immediate: true,
    },
  },
  methods: {
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  justify-content: space-evenly;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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

main {
  padding: 20px;
}
</style>
