<template>
    <div class="landing">
        <div v-if="isLoggedIn">
            <h1>Welcome to FollowBee</h1>
            <p>A platform for connecting content creators with their audience.</p>
            <div class="cta-buttons">
                <router-link to="/dashboard" class="cta-button">Dashboard</router-link>
                <router-link to="/logout" class="cta-button">Log Out</router-link>
            </div>
        </div>
        <div v-else>
            <h1>Welcome to FollowBee</h1>
            <p>A platform for connecting content creators with their audience.</p>
            <div class="cta-buttons">
                <router-link to="/register" class="cta-button">Register</router-link>
                <router-link to="/login" class="cta-button">Log In</router-link>
            </div>
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
</style>
