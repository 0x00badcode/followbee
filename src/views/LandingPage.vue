<template>
    <div class="landing">
      <div class="name">
        <h1>FollowBee</h1>
      </div>
      <hr>
      <div>
        <h1>join as</h1>
      </div>
      <div class="cta-buttons">
        <button class="cta-button" @click="showUserPopup">User</button>
        <button class="cta-button" @click="showCreatorPopup">Content Creator</button>
      </div>
      <div class="popup" v-if="showPopup" @click.self="closePopup">
        <div class="popup-inner">
          <button class="close-button" @click="closePopup">X</button>
          <component :is="popupComponent"></component>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { mapState } from 'vuex';
  import UserRegister from '../components/UserRegister.vue';
  import CreatorRegister from '../components/CreatorRegister.vue';

  export default {
    name: 'LandingPage',
    components: {
      UserRegister,
      CreatorRegister,
    },
    computed: {
      ...mapState(['loggedIn']),
    },
    data() {
      return {
        showPopup: false,
        popupComponent: null,
      };
    },
    methods: {
      showUserPopup() {
        this.showPopup = true;
        this.popupComponent = UserRegister;
      },
      showCreatorPopup() {
        this.showPopup = true;
        this.popupComponent = CreatorRegister;
      },
      closePopup() {
        this.showPopup = false;
        this.popupComponent = null;
      },
    },
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

  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup-inner {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
  }

  .close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  </style>