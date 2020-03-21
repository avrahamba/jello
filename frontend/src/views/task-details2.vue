<template>
  <section class="task-details">
    <router-link :to="'/'+boardId">
      <div class="screen"></div>
    </router-link>
    <modals-container />
    <modal name="editModal">
      <div class="main-container-modal">

      </div>
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
  computed: {
    currTask() {
      return this.$store.getters.currTask;
    }
  },
  created() {
    var taskId = this.$route.params.id;
    var taskListId = taskId.split("-");
    var boardId = taskId.split("-")[0];
    taskListId.pop();
    taskListId = taskListId.join("-");
    this.boardId = boardId;

    this.$store.dispatch({
      type: "getTask",
      taskId,
      taskListId,
      boardId
    });
  },
  methods: {}
};
</script>

<style>
</style>
