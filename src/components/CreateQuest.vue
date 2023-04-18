<!-- src/components/CreateQuest.vue -->
<template>
    <div>
      <h2>Your Quests</h2>
      <div v-for="quest in quests" :key="quest._id">
        {{ quest.title }}
        <!-- Add other quest details as needed -->
      </div>
      <quest-form @created="onQuestCreated"></quest-form>
    </div>
  </template>

  <script>
  import QuestForm from './QuestForm.vue';
  import { getQuestsByCreator } from '@/api/apiFunctions';

  export default {
    components: {
      QuestForm,
    },
    data() {
      return {
        quests: [],
      };
    },
    async created() {
      await this.fetchQuests();
    },
    methods: {
      async fetchQuests() {
        const creatorId = this.$route.params.creatorId;
        const response = await getQuestsByCreator(creatorId);
        if (response.success) {
          this.quests = response.data;
        } else {
          console.error('Failed to fetch quests:', response.error);
        }
      },
      onQuestCreated(newQuest) {
        this.quests.push(newQuest);
      },
    },
  };
  </script>
