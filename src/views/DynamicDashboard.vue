<template>
    <div class="dynamic-dashboard">
        <div class="top-section">
            <div class="left-div">
                <creator-search></creator-search>
            </div>
            <div class="right-div">
                <div v-if="isLoggedIn">
                    <user-profile :username="username" :email="email" :profile-picture="profilePicture"
                        @switch-profile="switchProfile"></user-profile>

                </div>
            </div>
        </div>
        <div class="main-section">
            main section
            <div v-if="loginType === 'user'">
                User
            </div>
            <div v-else>
                creator
            </div>
            <!-- <component :is="dashboardComponent"></component> -->
        </div>
    </div>
</template>

<script>
import UserProfile from "@/components/UserProfile.vue";
import CreatorSearch from "@/components/CreatorSearch.vue";
import { mapState } from "vuex";

export default {
    components: {
        CreatorSearch,
        UserProfile,
    },
    computed: {
        ...mapState(["loginType", "isLoggedIn"]),
        // dashboardComponent() {
        //     return this.loginType === "user" ? UserDashboard : CreatorDashboard;
        // },
    },
    methods: {
        switchProfile() {
            if (this.loginType === "user") {
                this.$store.dispatch("setLoginType", "creator");
            } else {
                this.$store.dispatch("setLoginType", "user");
            }
        },
    }
};
</script>

<style scoped>
html,
body,
#app {
    height: 100%;
    margin: 0;
}

.dynamic-dashboard {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.top-section {
    display: flex;
    flex-basis: 25%;
    height: 25%;
}

.left-div {
    flex-basis: 80%;
    background-color: #e23a3a;
}

.right-div {
    flex-basis: 20%;
    background-color: #66a648;
}

.main-section {
    flex-grow: 1;
    background-color: #26316d;
}
</style>
