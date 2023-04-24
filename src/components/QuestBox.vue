<template>
  <div class="quest-box" :style="containerStyle">
    <div class="quest-box-inner">
      <div class="quest-box-header">{{ quest.name }}</div>
      <div class="quest-box-content">{{ quest.description }}</div>
      <img
        v-if="quest.image && isLargeEnough"
        class="quest-box-image"
        :src="quest.image"
        alt="Quest image"
      />
      <div class="quest-box-footer">{{ quest.action }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    quest: {
      type: Object,
      required: true,
    },
    containerStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isLargeEnough() {
      const width = this.$el.clientWidth;
      const height = this.$el.clientHeight;

      // You can customize the minimum width and height as needed
      const minWidth = 100;
      const minHeight = 100;

      return width > minWidth && height > minHeight;
    },
  },
};
</script>

<!-- Add your styles here -->
<style scoped>
.quest-box {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 10px;
  height: 100%;
}

.quest-box-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.quest-box-header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.quest-box-content {
  font-size: 16px;
  margin-bottom: 10px;
}

.quest-box-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 10px;
}

.quest-box-footer {
  font-size: 16px;
  font-weight: bold;
  text-align: right;
}

.quest-box-footer a {
  color: #5e6fca;
}

.quest-box-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .quest-box {
    margin: 10px 0;
  }
}
</style>
