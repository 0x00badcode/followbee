<!-- UserProfile.vue -->
<template>
    <div class="user-profile">
        <div class="user-info" @click="toggleDropdown">
            <img :src="profilePicture" alt="User Profile" class="profile-picture" />
            <div class="username">{{ username }}</div>
        </div>
        <transition name="dropdown">
            <div class="dropdown-menu" v-if="showDropdown">
                <div class="user-details">
                    <p><strong>Email:</strong> {{ email }}</p>
                    <!-- Add more user details if needed -->
                </div>
                <button @click="logout" class="logout-button">Logout</button>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: "https://via.placeholder.com/50",
        },
    },
    data() {
        return {
            showDropdown: false,
        };
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        logout() {
            // Add your logout logic here
            this.showDropdown = false;
        },
    },
};
</script>

<style scoped>
.user-profile {
    position: relative;
}

.user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.profile-picture {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 250px;
    z-index: 10;
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.3s ease;
}

.dropdown-enter,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.logout-button {
    display: block;
    background-color: #42b983;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
    width: 100%;
}

.logout-button:hover {
    background-color: #2c3e50;
}
</style>
