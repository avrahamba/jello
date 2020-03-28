<template>
  <main class="board" v-if="boardData" :style="style">
    <nav-board @changeTitle="changeTitle" :boardData="boardData"></nav-board>
    <div class="lists-canvas" >
      <draggable
        handle=".title"
        tag="section"
        ref="taskListsLection"
        class="lists-container"
        draggable=".unit-task-list-container"
        ghost-class="ghost"
        v-model="boardData.taskLists"
        v-bind="dragOptions"
        @end="move"
      >
        <div
          class="unit-task-list-container"
          v-for="taskList in boardData.taskLists"
          :key="taskList.id"
        >
          <task-list :task-list-data="taskList"></task-list>
        </div>
        <button class="add-list-btn btn" @click="createList">Add a list</button>
      </draggable>
    </div>
    <router-view></router-view>
  </main>
</template>

<script>
import draggable from "vuedraggable";
import taskList from "../components/task-list.vue";
import navBoard from "../components/nav-board.vue";
import { socketService } from "../services/SocketService.js";
export default {
  created() {
    //TODO: remove this.boardId never called.
    const boardId = this.boardId || this.$route.params.id;

    this.$store
      .dispatch({ type: "getBoard", boardId })
      .then(board => {
        if (board.failed) {
          this.$router.push("/");
          return;
        }
        return board;
      })
      .then(board => {
        socketService.setup();
        socketService.emit("connect-to-board", board._id);

        socketService.on("change-data", data => {
          this.$store.dispatch({ type: "dataFromSocket", data });
        });
      });
  },
  destroyed() {
    socketService.terminate();
  },
  methods: {
    createList() {
      this.$store
        .dispatch({
          type: "addList"
        })
        .then(res => {});
    },
    move({ oldIndex, newIndex }) {
      this.$store.dispatch({ type: "moveList", oldIndex, newIndex });
    },
    changeTitle(title) {
      this.$store.dispatch({ type: "changeTitleBoard", title });
    }
  },
  computed: {
    boardData() {
      return this.$store.getters.board;
    },
    dragOptions() {
      return {
        animation: "200",
        group: "task-list"
      };
    },
    style(){

      if(this.boardData){
        if(this.boardData.style.background.includes('http')){
          return {  'background-image': `url("${this.boardData.style.background}")`  }
        }
        else {
          return {'background-color':this.boardData.style.background}
        }
      }
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
.board{
   background-repeat: no-repeat;
  background-size: 100%;
  background-attachment: fixed;
}
</style>
