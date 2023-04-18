<template>
  <div id="app">
    <header>
      <nav>
          <router-link to="/">Home</router-link>
        <div v-if="isLoggedIn && isCreator">
          <router-link :to="`/quests/${loggedInUserId}`">My Quests</router-link>
        </div>

        <div v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
        </div>

        <div v-if="isLoggedIn && !isCreator">
          <router-link to="/search">Search Content Creators</router-link>
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

export default {
  computed: {
    ...mapState(['isLoggedIn']),
  },
  data() {
    return {
      loggedInUserId: '',
      isCreator: false,
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
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
