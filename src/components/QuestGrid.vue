<template>
    <div ref="gridContainer" class="grid-stack">
        <div v-for="(layoutItem, index) in layout" :key="index" class="grid-stack-item" :gs-x="layoutItem.x"
            :gs-y="layoutItem.y" :gs-width="layoutItem.gridWidth" :gs-height="layoutItem.gridHeight">
            <QuestBox :quest="getQuestById(layoutItem.questId)" :gridWidth="layoutItem.gridWidth"
                :gridHeight="layoutItem.gridHeight"></QuestBox>
        </div>
        <!-- Empty state content -->
        <div v-if="quests.length === 0" class="empty-state">
            <p>No quests available. Click the "+" button to add a new quest.</p>
        </div>
        <QuestForm v-if="isCreator" @created="createQuest" />
    </div>
</template>

<script>
import {
    getCreatorQuestsAndLayout,
    saveCreatorQuestAndLayout,
} from "@/api/apiFunctions";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import QuestBox from "@/components/QuestBox.vue";
import QuestForm from "@/components/QuestForm.vue";
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["username"]),
    },
    components: {
        QuestBox,
        QuestForm,
    },
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
        console.log(this.$store.state.userData.username);
        const response = await getCreatorQuestsAndLayout(this.username);
        if (response.success) {
            this.quests = response.data.quests;
            this.layout = response.data.layout;
        }

        this.grid = GridStack.init({ column: 12, float: true }, this.$refs.gridContainer);

        if (this.isCreator) {
            this.grid.enable();
            this.grid.on("change", this.saveLayout);
        } else {
            this.grid.disable();
        }
    },

    beforeUnmount() {
        if (this.isCreator) {
            this.grid.off("change", this.saveLayout);
        }
        this.grid.destroy();
    },
    methods: {
        getQuestById(questId) {
            return this.quests.find((quest) => quest._id === questId) || {};
        },
        async saveLayout() {
            if (!this.isCreator) return;
            const serializedData = this.grid.save(false);
            const response = await saveCreatorQuestAndLayout(this.username, serializedData);
            if (!response.success) {
                console.error(response.error);
            }
        },
        createQuest(newQuest) {
            this.quests.push(newQuest);
            this.layout.push({
                questId: newQuest._id,
                x: 0,
                y: 0,
                width: 4,
                height: 4,
            });

            this.$nextTick(() => {
                this.grid.addWidget(
                    {
                        x: 0,
                        y: 0,
                        width: 4,
                        height: 4,
                        content: `
          <quest-box
            :quest="getQuestById('${newQuest._id}')
            :gridWidth="4"
            :gridHeight="4"
          ></quest-box>`,
                    },
                    this.$refs.gridContainer
                );

                // Add the QuestForm widget to the grid
                this.grid.addWidget(
                    {
                        x: this.grid.getGridWidth() - 4,
                        y: this.grid.getGridHeight(),
                        width: 4,
                        height: 4,
                        content: `
          <quest-form
            :x="${this.grid.getGridWidth() - 4}"
            :y="${this.grid.getGridHeight()}"
            :width="4"
            :height="4"
            @created="createQuest"
          ></quest-form>`,
                    },
                    this.$refs.gridContainer
                );
                this.saveLayout();
            });
        },

    },
};
</script>

<style scoped>
.grid-stack {
    position: relative;
}

.add-quest-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 10;
}

.add-quest-button button {
    font-size: 24px;
    background-color: #5e6fca;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
}

.add-quest-button button:hover {
    background-color: #4c5ab7;
}
</style>