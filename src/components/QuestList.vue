<template>
    <div>
        <h2>Quests</h2>
        <ul>
            <li v-for="quest in quests" :key="quest._id">
                <router-link :to="`/quests/${quest._id}`">{{ quest.title }}</router-link>
                <button @click="editQuest(quest)">Edit</button>
                <button @click="deleteQuest(quest._id)">Delete</button>
            </li>
        </ul>
        <router-link to="/quests/new">Create a new quest</router-link>
        <quest-form v-if="showForm" :quest="selectedQuest" @close="showForm = false" @created="addQuest"
            @updated="updateQuest" />
    </div>
</template>

<script>
import { getQuestsForCreator, deleteQuest } from '@/api/apiFunctions';
import QuestForm from './QuestForm.vue';

export default {
    components: {
        QuestForm,
    },
    data() {
        return {
            quests: [],
            showForm: false,
            selectedQuest: null,
        };
    },
    async created() {
        const creatorId = this.$route.params.creatorId;
        const response = await getQuestsForCreator(creatorId);

        if (response.success) {
            this.quests = response.data;
        } else {
            console.error('Failed to fetch quests:', response.error);
        }
    },
    methods: {
        editQuest(quest) {
            this.selectedQuest = quest;
            this.showForm = true;
        },
        async deleteQuest(questId) {
            const response = await deleteQuest(questId);

            if (response.success) {
                this.quests = this.quests.filter((quest) => quest._id !== questId);
            } else {
                console.error('Failed to delete quest:', response.error);
            }
        },
        addQuest(quest) {
            this.quests.push(quest);
        },
        updateQuest(updatedQuest) {
            const index = this.quests.findIndex((quest) => quest._id === updatedQuest._id);
            if (index !== -1) {
                this.$set(this.quests, index, updatedQuest);
            }
        },
    },
}
</script>
