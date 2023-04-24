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
                Creator
                <quest-grid :username="username" :is-creator="loginType === 'creator'"></quest-grid>
            </div>
        </div>
    </div>
</template>

<script>
import UserProfile from "@/components/UserProfile.vue";
import CreatorSearch from "@/components/CreatorSearch.vue";
import QuestGrid from "@/components/QuestGrid.vue";
import { mapState, mapGetters } from "vuex";

export default {
    components: {
        CreatorSearch,
        UserProfile,
        QuestGrid,
    },
    computed: {
        ...mapState(["loginType"]),
        ...mapGetters(["isLoggedIn"]),
    },
    methods: {
        switchProfile() {
            if (this.loginType === "user") {
                this.$store.dispatch("setLoginType", "creator");
            } else {
                this.$store.dispatch("setLoginType", "user");
            }
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
  width: 100%; /* Add width 100% */
}

.dynamic-dashboard {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%; /* Add width 100% */
}

.top-section {
  display: flex;
  flex-basis: 25%;
  height: 25%;
  width: 100%; /* Add width 100% */
}

.left-div {
  flex-basis: 80%;
  background-color: #e23a3a;
  width: 80%; /* Add width 80% */
}

.right-div {
  flex-basis: 20%;
  background-color: #66a648;
  width: 20%; /* Add width 20% */
}

.main-section {
  flex-grow: 1;
  background-color: #5e6fca;
  width: 100%; /* Add width 100% */
}

</style>
