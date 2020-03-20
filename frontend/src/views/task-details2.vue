<template>
  <section class="task-details">
    <router-link :to="'/'+boardId">
      <div class="screen"></div>
    </router-link>
    <modals-container />
    <modal name="editModal">
    <h1>im edit modal</h1>
    </modal>
  </section>
</template>

<script>
export default {
  data() {
    return {
      boardId: null
    };
  },
  mounted() {
      this.$modal.show("editModal");
  },
  created() {
    var params = this.$route.params.id;
    this.boardId = params.split("-")[0];
  },
  methods: {}
};
</script>

<style>
</style>
