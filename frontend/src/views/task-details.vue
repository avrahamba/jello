<template>
  <section class="task-details" v-if="currTask">
    <task-modal @save="saveTask" :currTask="currTask" :boardId="boardId"></task-modal>
  </section>
</template>

<script>
import taskModal from "../components/modal/task-modal.vue";
export default {
  data() {
    return {
      boardId: null,
      currTask: null,
    };
  },
  mounted() {
    this.$modal.show("editModal");
  },
  created() {
    const taskId = this.$route.params.id;
    const boardId = taskId.split("-")[0];
    this.boardId = boardId;

    this.$store
      .dispatch({
        type: "getTask",
        taskId,
        boardId
      })
      .then(currTask => {
        this.currTask = currTask;
      });
  },
  methods: {
    saveTask(taskToSave) {
      this.$store
        .dispatch({
          type: "saveTask",
          boardId: this.boardId,
          taskToSave
        })
        // .then(currTask => {
        //   this.$router.push("/" + this.boardId);
        // });
    }
  },
  components: {
    taskModal
  }
};
</script>

<style>
</style>
