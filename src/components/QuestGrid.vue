<template>
    <div ref="gridContainer" class="grid-stack">
        <div v-for="(layoutItem, index) in layout" :key="index" class="grid-stack-item" :gs-x="layoutItem.x"
            :gs-y="layoutItem.y" :gs-width="layoutItem.gridWidth" :gs-height="layoutItem.gridHeight">
            <QuestBox :quest="getQuestById(layoutItem.questId)" :containerStyle="{
                    width: '100%',
                    height: '100%',
                }"></QuestBox>
        </div>
        <div v-if="quests.length === 0" class="empty-state">
            <p>No quests available. Click the "+" button to add a new quest.</p>
        </div>
        <QuestForm v-if="isCreator" @created="createQuest" />
    </div>
</template>

<script>
import {
    getCreatorQuestsAndLayout,
    saveCreatorQuestsAndLayout,
} from "@/api/apiFunctions";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import QuestBox from "@/components/QuestBox.vue";
import QuestForm from "@/components/QuestForm.vue";
import { useUserStore } from '@/store/userStore';

export default {
    components: {
        QuestBox,
        QuestForm,
    },
    props: {
        isCreator: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        const userStore = useUserStore();

        return {
            userStore,
        };
    },
    computed: {
        userData() {
            return this.userStore.userData;
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
        const response = await getCreatorQuestsAndLayout(this.userData.username);
        if (response.error) {
            console.log("User is not a creator yet, or quests cannot be found.");
        }
        if (response.success) {
            this.quests = response.data.quests;
            this.layout = response.data.layout;
        }

        this.grid = GridStack.init(
            {
                column: 12,
                float: true,
                resizable: {
                    handles: 'e, se, s, sw, w', // You can change the handles to control which edges allow resizing
                },
                draggable: {
                    handle: '.quest-box-header', // You can change the handle to control which area can be used to drag the quest box
                },
            },
            this.$refs.gridContainer
        );

        if (this.isCreator) {
            this.grid.enable();
            this.grid.on('change', this.saveLayout);
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
            this.layout = serializedData;
            const response = await saveCreatorQuestsAndLayout(this.userData.username, serializedData);
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
                this.grid.engine.updateNode(this.layout[this.layout.length - 1]);
                this.grid.engine.float = true;

                if (this.isCreator) {
                    this.grid.enable();
                    this.grid.on("change", this.saveLayout);
                } else {
                    this.grid.disable();
                }

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