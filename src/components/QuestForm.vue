<template>
    <div>
      <h2 v-if="isUpdate">Update Quest</h2>
      <h2 v-else>Create Quest</h2>
      <form @submit.prevent="submitForm">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="form.title" required />
        <br />
        <label for="description">Description:</label>
        <textarea id="description" v-model="form.description"></textarea>
        <br />
        <label for="goal">Goal:</label>
        <input type="number" id="goal" v-model="form.goal" required />
        <br />
        <button type="submit">Submit</button>
        <button type="button" @click="$emit('close')">Close</button>
      </form>
    </div>
  </template>
  
  <script>
  import { createQuest, updateQuest } from '@/api/apiFunctions';
  
  export default {
    props: {
      quest: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        form: {
          title: this.quest?.title || '',
          description: this.quest?.description || '',
          goal: this.quest?.goal || 0,
        },
      };
    },
    computed: {
      isUpdate() {
        return !!this.quest;
      },
    },
    methods: {
      async submitForm() {
        const creatorId = this.$route.params.creatorId;
  
        if (this.isUpdate) {
          const response = await updateQuest(this.quest._id, this.form.title, this.form.description, this.form.goal, this.quest.progress, creatorId);
  
          if (response.success) {
            this.$emit('updated', response.data);
          } else {
            console.error('Failed to update quest:', response.error);
          }
        } else {
          const response = await createQuest(this.form.title, this.form.description, this.form.goal, creatorId);
  
          if (response.success) {
            this.$emit('created', response.data);
          } else {
            console.error('Failed to create quest:', response.error);
          }
        }
        this.$emit('close');
      },
    },
  };
  </script>
  