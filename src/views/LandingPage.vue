<template>
    <div class="landing">
        <div class="name">
        <h1>FollowBee</h1>
    </div>
        <div class="cta-buttons">
            <router-link to="/register" class="cta-button">User</router-link>
            <router-link to="/register" class="cta-button">Content Creator</router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "LandingPage",
    computed: {
        ...mapState(['loggedIn'])
    }
};
</script>

<style scoped>
.landing {
    text-align: center;
    padding: 20px;
}

.cta-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.cta-button {
    text-decoration: none;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border-radius: 5px;
    font-size: 16px;
}

.name {
    font-size: 75px;
    font-weight: bold;
    margin: 10px 0;
}
</style>
