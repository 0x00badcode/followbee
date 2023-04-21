<!-- src/views/CreatorDashboard.vue -->
<template>
  <div class="dashboard">
    <h1>My Quests</h1>
    <div class="new-quest-form">
      <quest-form @created="onQuestCreated"></quest-form>
    </div>
    <ul class="quest-list">
      <li v-for="quest in quests" :key="quest._id">
        <h3>{{ quest.title }}</h3>
        <p>{{ quest.description }}</p>
        <p>Progress: {{ quest.progress }} / {{ quest.goal }}</p>
        <button @click="deleteQuest(quest._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'; //!we need to import the api not axios
import QuestForm from '@/components/QuestForm.vue';

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
    try {
      const response = await axios.get(`/api/${this.$route.params.creatorId}/quests`);
      this.quests = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    onQuestCreated(newQuest) {
      this.quests.push(newQuest);
    },
    async deleteQuest(questId) {
      try {
        await axios.delete(`/api/quests/${questId}`);
        this.quests = this.quests.filter((quest) => quest._id !== questId);
      } catch (error) {
        console.error(error);
      }
    },
    async created() {
      const username = this.$route.params.username;
      const response = await getCreatorQuestsAndLayout(username);

      if (response.success) {
        this.quests = response.data.quests;
        this.layout = response.data.layout;
      } else {
        console.error('Failed to fetch quests and layout:', response.error);
      }
    },

  },
};
</script>

<style scoped></style>
