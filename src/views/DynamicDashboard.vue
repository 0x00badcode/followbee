<template>
    <div class="dynamic-dashboard">
        <div class="top-section">
            <div class="left-div">
                <creator-search></creator-search>
            </div>
            <div class="right-div">
                <div v-if="isLoggedIn">
                    <user-profile v-if="userData" :username="username" :email="email" :profile-picture="profilePicture"
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
                Creator
                <quest-grid :is-creator="loginType === 'creator'"></quest-grid>
            </div>
        </div>
    </div>
</template>

<script>
import UserProfile from "@/components/UserProfile.vue";
import CreatorSearch from "@/components/CreatorSearch.vue";
import QuestGrid from "@/components/QuestGrid.vue";
import { useUserStore } from '@/store/userStore';

export default {
    components: {
        CreatorSearch,
        UserProfile,
        QuestGrid,
    },
    setup() {
        const userStore = useUserStore();

        function switchProfile() {
            if (userStore.loginType === "user") {
                userStore.setLoginType("creator");
            } else {
                userStore.setLoginType("user");
            }
        }

        return {
            userStore,
            switchProfile,
        };
    },
    computed: {
        isLoggedIn() {
            return this.userStore.isLoggedIn;
        },
        userData() {
            return this.userStore.userData;
        },
        loginType() {
            return this.userStore.loginType;
        },
        username() {
            return this.userStore.username;
        },
        email() {
            return this.userStore.email;
        },
        profilePicture() {
            return this.userStore.profilePicture;
        },
    },
};
</script>

<style scoped>
html,
body,
#app {
    height: 100%;
    margin: 0;
    width: 100%;
    /* Add width 100% */
}

.dynamic-dashboard {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    /* Add width 100% */
}

.top-section {
    display: flex;
    flex-basis: 25%;
    height: 25%;
    width: 100%;
    /* Add width 100% */
}

.left-div {
    flex-basis: 80%;
    background-color: #e23a3a;
    width: 80%;
    /* Add width 80% */
}

.right-div {
    flex-basis: 20%;
    background-color: #66a648;
    width: 20%;
    /* Add width 20% */
}

.main-section {
    flex-grow: 1;
    background-color: #5e6fca;
    width: 100%;
    /* Add width 100% */
}
</style>
