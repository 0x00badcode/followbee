<template>
    <div ref="gridContainer" class="grid-container">
        <div v-for="(layoutItem, index) in layout" :key="index" :style="{
                width: layoutItem.width + 'px',
                height: layoutItem.height + 'px',
                top: layoutItem.y + 'px',
                left: layoutItem.x + 'px',
            }" class="quest-item">
            <div class="quest-content">
                <!-- Display quest content here -->
                {{ getQuestById(layoutItem.questId).content }}
            </div>
            <!-- Conditional rendering for the Delete button -->
            <button v-if="isCreator" @click="deleteQuest(layoutItem.questId)" class="delete-button">
                Delete
            </button>
        </div>
    </div>
</template>


<script>
import { getCreatorQuestsAndLayout } from "@/api/apiFunctions";
import { Grid } from "gridjs";

export default {
    props: {
        username: {
            type: String,
            required: true,
        },
        isCreator: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            quests: [],
            layout: [],
            grid: null,
        };
    },
    async mounted() {
        const response = await getCreatorQuestsAndLayout(this.username);
        if (response.success) {
            this.quests = response.data.quests;
            this.layout = response.data.layout;
        }
        this.grid = new Grid(this.$refs.gridContainer, {
            draggable: true,
            resizable: true,
            // Other grid options can be set here
        });
    },
    beforeUnmount() {
        this.grid.destroy();
    },
    methods: {
        getQuestById(questId) {
            return this.quests.find((quest) => quest._id === questId) || {};
        },
        // async deleteQuest(questId) {
        //     // Call your deleteQuest API function here
        // },
    },
};
</script>

<style scoped>
.grid-container {
    position: relative;
}

.quest-item {
    position: absolute;
}
</style>
