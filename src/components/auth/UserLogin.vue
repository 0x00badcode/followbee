<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="loginHandler" class="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input :type="passwordInputType" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="showPassword">
          <input type="checkbox" id="showPassword" v-model="showPassword" />
          Show password
        </label>
      </div>
      <button type="submit" class="submit-button">Login</button>
    </form>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
import { login } from '@/api/apiFunctions';
import { useUserStore } from '@/store/userStore';

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
        const userStore = useUserStore();
        userStore.setAuthStatus(response.data.token);
        userStore.setUserId(response.data.user.uid);
        userStore.setLoginType("user");
        userStore.setUserData(response.data.user);
        this.$router.push("/me");
        this.message = "Login successful!";
      } else {
        this.message = response.error;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
}

input[type='email'],
input[type='password'],
input[type='text'] {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #2c3e50;
}

.message {
  margin-top: 20px;
  font-size: 14px;
  color: red;
}
</style>
