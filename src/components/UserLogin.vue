<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
        <div v-if="message" class="message">{{ message }}</div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            message: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('/api/auth/login', {
                    email: this.email,
                    password: this.password,
                });

                localStorage.setItem('token', response.data.token);
                this.$store.dispatch('setAuthStatus', true);
                this.$router.push('/');
                this.message = 'Login successful!';
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
  