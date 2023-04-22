<template>
  <div class="grid-stack-item">
  <div>
    <button v-if="!showForm" @click="showForm = true">+</button>
    <div v-if="showForm">
      <h2>Create Quest</h2>
      <form @submit.prevent="submitForm">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="form.title" required />
        <br />
        <label for="description">Description:</label>
        <textarea id="description" v-model="form.description"></textarea>
        <br />
        <label for="type">Type:</label>
        <select id="type" v-model="form.type" required>
          <option value="goal">Goal</option>
          <option value="timer">Timer</option>
        </select>
        <br />
        <label for="objective">Objective:</label>
        <input type="number" id="objective" v-model="form.objective" required />
        <br />
        <div v-if="form.type === 'timer'">
          <label for="duration">Duration (seconds):</label>
          <input type="number" id="duration" v-model="form.duration" required />
          <br />
        </div>
        <button type="submit">Submit</button>
        <button type="button" @click="showForm = false">Close</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import { createQuest } from "@/api/apiFunctions";

export default {
  props: {
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 4,
    },
    height: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      showForm: false,
      form: {
        title: "",
        description: "",
        type: "goal",
        objective: 0,
        duration: 0,
      },
    };
  },
  methods: {
    async submitForm() {
      const creatorId = this.$route.params.creatorId;

      const endTime = this.form.type === "timer" ? new Date(Date.now() + this.form.duration * 1000) : null;

      const response = await createQuest(
        this.form.title,
        this.form.description,
        this.form.type,
        this.form.objective,
        endTime,
        creatorId
      );

      if (response.success) {
        this.$emit("created", response.data);
      } else {
        console.error("Failed to create quest:", response.error);
      }

      this.showForm = false;
    },

  },
};
</script>
