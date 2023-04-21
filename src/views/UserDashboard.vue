<template>
    <div class="user-dashboard">
        <nav class="user-dashboard-nav">
            <div v-if="isLoggedIn">
                <user-profile :username="username" :email="email" :profile-picture="profilePicture"></user-profile>
            </div>
        </nav>

        <creator-search></creator-search>

        <h2>Quest Details</h2>
        <quest-details :questId="1"></quest-details>
    </div>
</template>

<script>
import { mapState } from "vuex";
import CreatorSearch from '@/components/CreatorSearch.vue';
import UserProfile from "@/components/UserProfile.vue";

export default {
    components: {
        CreatorSearch,
        UserProfile,
    },
    computed: {
        ...mapState(["isLoggedIn"]),
    },
    data() {
        return {
            username: "User Name", // Replace with real user data
            email: "user@example.com", // Replace with real user data
            profilePicture: "https://via.placeholder.com/50",
            // Add any data properties needed for the UserDashboard component
        };
    },
    methods: {
        // Add any methods needed for the UserDashboard component
    },
};
</script>

<style scoped>
.user-dashboard {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.user-dashboard-nav {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #e1e1e1;
}

h2 {
    margin-bottom: 20px;
}
</style>
