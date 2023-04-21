<template>
    <div class="quest">
        <img v-if="shouldShowImage && quest.image" :src="quest.image" alt="Quest image" />
        <h3>{{ quest.name }}</h3>
        <p>{{ quest.description }}</p>
        <p>Action: {{ quest.action }}</p>
        <p>Objective: {{ quest.objective }}</p>
        <p>Progress: {{ quest.progress }}</p>
    </div>
</template>

<script>
export default {
    props: {
        quest: {
            type: Object,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
    },
    computed: {
        shouldShowImage() {
            return this.size === '2x2' || this.size === '2x1';
        },
    },
};
</script>





<style scoped>
.quest {
    /* Add styles for the quest component here */
}
</style>
