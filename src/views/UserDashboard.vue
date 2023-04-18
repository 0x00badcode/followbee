<template>
    <div>
        <h1>User Dashboard</h1>

        <h2>Search Content Creators</h2>
        <creator-search></creator-search>

        <h2>Quest Details</h2>
        <quest-details :questId="1"></quest-details>

    </div>
</template>

<script>
import CreatorSearch from '@/components/CreatorSearch.vue';
import QuestDetails from '@/components/QuestDetails.vue';

export default {
    components: {
        CreatorSearch,
        QuestDetails,
    },
    data() {
        return {
            // Add any data properties needed for the UserDashboard component
        };
    },
    methods: {
        // Add any methods needed for the UserDashboard component
    },
};
</script>

<style scoped>
/* Add any CSS styles specific to the UserDashboard component */
</style>
