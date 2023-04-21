<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="registerHandler">
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
          <input :type="passwordInputType" id="password" v-model="password" required />
        </div>
        <div>
          <label for="profilePicture">Profile Picture:</label>
          <input type="text" id="profilePicture" v-model="profilePicture" />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea id="description" v-model="description"></textarea>
        </div>
        <div>
          <label for="showPassword">
            <input type="checkbox" id="showPassword" v-model="showPassword" />
            Show password
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </template>

  <script>
  import { register } from '@/api/apiFunctions';

  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        profilePicture: '',
        description: '',
        isCreator: true,
        showPassword: false,
        message: '',
      };
    },
    computed: {
      passwordInputType() {
        return this.showPassword ? 'text' : 'password';
      },
    },
    methods: {
      async registerHandler() {
        const creatorInfo = {
          profilePicture: this.profilePicture,
          description: this.description,
        };

        const response = await register(
          this.username,
          this.email,
          this.password,
          this.isCreator,
          creatorInfo
        );

        if (response.success) {
          localStorage.setItem('token', response.data.token);
          this.$store.dispatch('setAuthStatus', true);
          this.$router.push('/');
          this.message = 'Registration successful! You can now log in.';
        } else {
          this.message = response.error;
        }
      },
    },
  };
  </script>
