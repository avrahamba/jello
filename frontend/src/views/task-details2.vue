<template>
  <section class="task-details" v-if="currTask">
    <myModal @save="saveTask" :currTask="currTask" :boardId="boardId"></myModal>
  </section>
</template>

<script>
import myModal from "../components/my-modal.vue";
export default {
  data() {
    return {
      boardId: null,
      currTask: null,
      listId: null
    };
  },
  created() {
    var taskId = this.$route.params.id;
    var taskListId = taskId.split("-");
    var boardId = taskId.split("-")[0];
    taskListId.pop();
    taskListId = taskListId.join("-");
    this.taskListId = taskListId;
    this.boardId = boardId;

    this.$store
      .dispatch({
        type: "getTask",
        taskId,
        taskListId,
        boardId
      })
      .then(currTask => {
        this.currTask = currTask;
        console.log(this.currTask);
      });
  },
  methods: {
    saveTask(taskToSave) {
      this.$store
        .dispatch({
          type: "saveTask",
          taskListId: this.taskListId,
          boardId: this.boardId,
          taskToSave
        })
        .then(currTask => {
          this.$router.push("/" + this.boardId);
        });
    }
  },
  components: {
    myModal
  }
};
</script>

<style>
</style>
