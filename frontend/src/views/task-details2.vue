<template>
  <section class="task-details">
    <router-link :to="'/'+boardId">
      <div class="screen"></div>
    </router-link>
    <modal name="hello-world">hello, world!</modal>
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
    this.$modal.show("hello-world");
  },
  created() {
    var params = this.$route.params.id;
    this.boardId = params.split("-")[0];
  }
};
</script>

<style>
</style>
