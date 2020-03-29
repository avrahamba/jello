<template>
  <section class="mini-modal add-checklist">
    <div class="title">
      <h3>Checklist</h3>
      <!-- <button @click="close">&times;</button> -->
    </div>
    <form @submit.prevent="add">
      <label>
        <div class="title-checklist">Title:</div>
        <input type="text" v-model="title" />
      </label>
      <button id="add-check-list">Add</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: ""
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    add() {
      this.$emit("add", this.title);
    }
  }
};
</script>

<style>
</style>
