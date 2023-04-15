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
                <input :type="passwordInputType" id="password" v-model="password" required />
            </div>
            <div>
                <label for="showPassword">
                    <input type="checkbox" id="showPassword" v-model="showPassword" />
                    Show password
                </label>
            </div>
            <button type="submit">Login</button>
        </form>
        <div v-if="message" class="message">{{ message }}</div>
    </div>
</template>
  
<script>
import api from '@/api';

export default {
    data() {
        return {
            email: '',
            password: '',
            message: '',
            showPassword: false,
        };
    },
    computed: {
        passwordInputType() {
            return this.showPassword ? 'text' : 'password';
        },
    },
    methods: {
        async login() {
            try {
                const response = await api.post('/api/auth/login', {
                    email: this.email,
                    password: this.password,
                });

                localStorage.setItem('token', response.data.token);
                this.$store.dispatch('setAuthStatus', true);
                this.$router.push('/');
                this.message = 'Login successful!';
            } catch (error) {
                console.error('Login failed:', error);
                console.log('Error object:', error);
                console.log('Error response:', error.response);
                console.log('Error response data:', error.response && error.response.data);
                console.log('Error response status:', error.response && error.response.status);

                if (error.response && error.response.data && error.response.data.message) {
                    this.message = 'Login failed: ' + error.response.data.message;
                } else {
                    this.message = 'Login failed: An unknown error occurred.';
                }
            }
        },

    },
};
</script>
  