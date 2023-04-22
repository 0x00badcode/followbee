<!-- QuestBox.vue -->
<template>
    <div class="quest-box">
      <div class="quest-box-header">{{ quest.name }}</div>
      <div class="quest-box-content">{{ quest.description }}</div>
      <img v-if="quest.image && isLargeEnough" class="quest-box-image" :src="quest.image" alt="Quest image" />
      <div class="quest-box-footer">{{ quest.action }}</div>
    </div>
  </template>

  <script>
  export default {
    props: {
      quest: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isLargeEnough: false,
      };
    },
    mounted() {
      const width = this.$el.clientWidth;
      const height = this.$el.clientHeight;

      // You can customize the minimum width and height as needed
      const minWidth = 100;
      const minHeight = 100;

      if (width > minWidth && height > minHeight) {
        this.isLargeEnough = true;
      }
    },
  };
  </script>

  <!-- Add your styles here -->
