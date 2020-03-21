<template>
  <section class="board" v-if="boardData" :style="style">
    <nav-board :boardData="boardData"></nav-board>
    <section>
      <draggable
        class="lists-container"
        draggable=".task-list"
        v-model="boardData.taskLists"
        v-bind="dragOptions"
        @end="move"
      >
        <task-list
          v-for="taskList in boardData.taskLists"
          :key="taskList.id"
          :task-list-data="taskList"
        ></task-list>
        <button class="add-list-btn btn" @click="createList">Add a list</button>
      </draggable>
    </section>
    <router-view></router-view>
  </section>
</template>

<script>
import draggable from "vuedraggable";
import taskList from "../components/task-list.vue";
import navBoard from "../components/nav-board.vue";
export default {
  props: {
    board: Object
  },
  data() {
    return {
      boardData: null
    };
  },
  created() {
    if (this.board) {
      this.boardData = this.board;
      return;
    }
    const boardId = this.boardId || this.$route.params.id;

    this.$store.dispatch({ type: "getBoard", boardId }).then(board => {
      if (board.failed) {
        this.$router.push("/");
        return;
      }
      this.boardData = board;
    });
  },
  methods: {
    createList() {
      this.$store
        .dispatch({
          type: "addList"
        })
        .then(res => {
          console.log("list added");
        });
    },
    move({ oldIndex, newIndex }) {
        this.$store.dispatch({type:'moveList',oldIndex,newIndex})
    }
  },
  computed: {
    style() {
      if (
        this.boardData.style.background &&
        !this.boardData.style.background.includes("http")
      )
        return {
          boardData: null
        };
    },
    dragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        group: "task-list"
      };
    }
  },
  components: {
    taskList,
    navBoard,
    draggable
  }
};
</script>

<style>
</style>
