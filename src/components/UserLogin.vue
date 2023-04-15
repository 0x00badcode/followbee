<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="loginHandler">
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
import { login } from '@/api/apiFunctions';

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
        async loginHandler() {
            const response = await login(this.email, this.password);

            if (response.success) {
                localStorage.setItem('token', response.data.token);
                this.$store.dispatch('setAuthStatus', true);
                this.$router.push('/');
                this.message = 'Login successful!';
            } else {
                this.message = response.error;
            }
        },
    },
};
</script>
