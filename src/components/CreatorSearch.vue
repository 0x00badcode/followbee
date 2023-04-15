<template>
  <div class="search">
    <input v-model="searchQuery" @input="searchCreators" placeholder="Search content creators..." />
    <ul v-if="searchResults.length > 0" class="search-results">
      <li v-for="creator in searchResults" :key="creator._id">
        <router-link :to="`/profile/${creator._id}`">{{ creator.username }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
    };
  },
  methods: {
    async searchCreators() {
      try {
        if (this.searchQuery.trim() === '') {
          this.searchResults = [];
          return;
        }
        const response = await axios.get(`/api/search?query=${this.searchQuery}`);
        this.searchResults = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
