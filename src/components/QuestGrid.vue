<template>
    <div ref="gridContainer" class="grid-container">
        <div v-for="(quest, index) in quests" :key="index" :style="{
            width: quest.width + 'px',
            height: quest.height + 'px',
            top: quest.y + 'px',
            left: quest.x + 'px',
        }" class="quest-item">
            <div class="quest-content">
                <!-- Display quest content here -->
            </div>
        </div>
    </div>
</template>

<script>
import { Grid } from 'gridjs';

export default {
    props: {
        quests: Array,
    },
    data() {
        return {
            grid: null,
        };
    },
    mounted() {
        this.grid = new Grid(this.$refs.gridContainer, {
            draggable: true,
            resizable: true,
            // Other grid options can be set here
        });
    },
    beforeUnmount() {
        this.grid.destroy();
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
