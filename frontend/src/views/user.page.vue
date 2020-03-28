<template>
  <div class="user-page">
    <h1>User Page</h1>
    <div class="add-new-board-container">
      <button class="btn-board btn-shadow" @click="isAddNewBoard=!isAddNewBoard">Add new board</button>
         <window-overlay v-if="isAddNewBoard" :dark="false" @close="isAddNewBoard=false"></window-overlay>
      <add-board v-if="isAddNewBoard" @addNewBoard="addNewBoard"></add-board>
    </div>
    <div   v-for="board in user.boards" :key="board._id">
    <!--  <h3>board id:{{board._id}}</h3>
      <h3>name:{{board.name}}</h3>
      <h3>color:{{board.background}}</h3>-->
  
    </div>
    <div class="cards-container">
      <board-card
        v-for="board in boards"
        :board="board"
        :key="board._id"
        :class="'board-card '+board.title"
        :data-image="board.background"
      >
          <h1 slot="header">{{board.title}}</h1>
          <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </board-card>
    </div>
  </div>
</template>

<script>
import addMembers from "../components/add-members.vue";
import boardCard from "../components/board-card.vue";
import addBoard from "../components/add-board";
import windowOverlay from "../components/window-overlay.vue";
export default {
  name: "user-page",
  data() {
    return {
      user: this.loggedinUser,
      boards: [],
      isAddNewBoard:false
    };
  },
  created() {
    console.log(this.boards);
    this.user = this.$store.getters.loggedinUser;
    console.log(this.loggedinUser);
    this.getBoardsFromStore();
  },
  methods: {

    addMembers(board) {
      board.isAddMembers = !board.isAddMembers;
    },
    getBoardsFromStore() {
      this.$store
        .dispatch({
          type: "getBoards",
          userId: this.$store.getters.loggedinUser._id
        })
        .then(boards => (this.boards = boards));
    },
    addNewBoard(prefs) {
      this.$store.dispatch({
        type: "addBoard",
        user: this.$store.getters.loggedinUser,
        prefs: prefs
      });
      this.getBoardsFromStore();
    }
  },
  components: {
    addMembers,
    boardCard,
    addBoard,
    windowOverlay
  }
};
</script>
<style lang="scss">
.cards-container {
  padding: 40px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>