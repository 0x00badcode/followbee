<template>
  <div>
    <h2>Search Content Creators</h2>
    <input type="text" v-model="searchQuery" @input="search" />
    <div v-for="creator in contentCreators" :key="creator._id">
      <router-link :to="`/quests/${creator._id}`">{{ creator.username }}</router-link>
    </div>
  </div>
</template>

<script>
import { searchContentCreators } from '@/api/apiFunctions';

export default {
  data() {
    return {
      searchQuery: '',
      contentCreators: [],
    };
  },
  methods: {
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
