<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="register">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <div>
                <label for="isCreator">
                    <input type="checkbox" id="isCreator" v-model="isCreator" />
                    Are you a content creator?
                </label>
            </div>
            <button type="submit">Register</button>
        </form>
        <div v-if="message" class="message">{{ message }}</div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            isCreator: false,
            message: '',
        };
    },
    methods: {
        async register() {
            try {
                const response = await axios.post('/api/auth/register', {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    isCreator: this.isCreator,
                });

                localStorage.setItem('token', response.data.token);
                this.$store.dispatch('setAuthStatus', true);
                this.$router.push('/');
                this.message = 'Registration successful! You can now log in.';
            } catch (error) {
                console.error('Registration failed:', error);
                console.log('Error object:', error);
                console.log('Error response:', error.response);
                console.log('Error response data:', error.response && error.response.data);
                console.log('Error response status:', error.response && error.response.status);

                if (error.response && error.response.data && error.response.data.message) {
                    this.message = 'Registration failed: ' + error.response.data.message;
                } else {
                    this.message = 'Registration failed: An unknown error occurred.';
                }
            }



        },
    },
};
</script>
