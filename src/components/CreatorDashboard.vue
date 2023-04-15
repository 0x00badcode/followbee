<template>
    <div class="dashboard">
        <h1>My Quests</h1>
        <div class="new-quest-form">
            <input v-model="newQuest.title" placeholder="Quest title" />
            <input v-model="newQuest.description" placeholder="Quest description" />
            <input v-model.number="newQuest.goal" placeholder="Quest goal" />
            <button @click="createQuest">Create Quest</button>
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
import axios from 'axios';

export default {
    data() {
        return {
            newQuest: {
                title: '',
                description: '',
                goal: 0,
            },
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
        async createQuest() {
            try {
                const response = await axios.post('/api/quests', this.newQuest);
                this.quests.push(response.data.quest);
                this.newQuest = { title: '', description: '', goal: 0 };
            } catch (error) {
                console.error(error);
            }
        },
        async deleteQuest(questId) {
            try {
                await axios.delete(`/api/quests/${questId}`);
                this.quests = this.quests.filter((quest) => quest._id !== questId);
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>

<style scoped>

</style>
  