<template>
  <div class="dashboard">
    <h1>My Quests</h1>
    <div class="new-quest-form">
      <quest-form @created="onQuestCreated"></quest-form>
    </div>
    <quest-grid :username="username" :isCreator="true"></quest-grid>
  </div>
</template>

<script>
import { getCreatorQuestsAndLayout } from '@/api/apiFunctions';
import QuestForm from '@/components/QuestForm.vue';
import QuestGrid from '@/components/QuestGrid.vue';

export default {
  components: {
    QuestForm,
    QuestGrid,
  },
  data() {
    return {
      quests: [],
      layout: [],
    };
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
  methods: {
    onQuestCreated(newQuest) {
      this.quests.push(newQuest);
    },
    // async deleteQuest(questId) {
    //   // You'll need to update the delete quest API function to match your API.
    //   // Then import it here and replace the axios.delete call.
    // },
  },
};
</script>