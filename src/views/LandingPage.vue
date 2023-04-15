<!-- src/views/LandingPage.vue -->
<template>
    <div class="landing">
        <h1>Welcome to FollowBee</h1>
        <p>A platform for connecting content creators with their audience.</p>
        <div class="cta-buttons">
            <router-link to="/register" class="cta-button">Register</router-link>
            <router-link to="/login" class="cta-button">Log In</router-link>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "LandingPage",
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
