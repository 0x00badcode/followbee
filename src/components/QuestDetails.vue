<template>
    <div>
        <h2>{{ quest.title }}</h2>
        <p>{{ quest.description }}</p>
        <p>Goal: {{ quest.goal }}</p>
        <p>Progress: {{ quest.progress }}</p>
        <router-link :to="`/quests/${quest._id}/edit`">Edit quest</router-link>
    </div>
</template>

<script>
import { getQuestById } from '@/api/apiFunctions';

export default {
    data() {
        return {
            quest: null,
        };
    },
    async created() {
        const questId = this.$route.params.questId;
        const response = await getQuestById(questId);

        if (response.success) {
            this.quest = response.data;
        } else {
            console.error('Failed to fetch quest:', response.error);
        }
    },
};
</script>
