<template>
  <section class="task-details">
    <router-link :to="'/'+boardId">
      <div class="screen"></div>
    </router-link>
    <modals-container />
    <modal name="editModal">
      <div>
        <date-picker></date-picker>
        <tag-picker></tag-picker>
      </div>
    </modal>
  </section>
</template>

<script>
import datePicker from "../components/date-picker.vue";
import tagPicker from "../components/tag-picker.vue";
export default {
  data() {
    return {
      boardId: null,
      currTask: null
    };
  },
  mounted() {
    this.$modal.show("editModal");
  },
  created() {
    var taskId = this.$route.params.id;
    var taskListId = taskId.split("-");
    var boardId = taskId.split("-")[0];
    taskListId.pop();
    taskListId = taskListId.join("-");
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
      });
  },
  methods: {},
  components: {
    datePicker,
    tagPicker
  }
};
</script>

<style>
</style>
