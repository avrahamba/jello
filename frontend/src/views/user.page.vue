<template>
  <div class="user-page">
    <h2>Hello {{user.name}}</h2>
    <!-- <div class="add-new-board-container">
      <button class="btn-add-board" @click="isAddNewBoard=!isAddNewBoard">Add new board</button>
    </div>-->
    <h2>Your Boards</h2>
    <div class="cards-container">
      <board-card
        v-for="board in UserBoards"
        :board="board"
        :key="board._id"
        :class="'board-card '+board.background "
      ></board-card>
      <button class="btn-add-board" @click="isAddNewBoard=true;isPublic=false">
        <h3>+</h3>
      </button>
    </div>
    <h2>Public Boards</h2>
    <div class="cards-container">
      <board-card
        v-for="board in publicBoard"
        :board="board"
        :key="board._id"
        :class="'board-card '+board.background "
      ></board-card>
      <button class="btn-add-board" @click="isAddNewBoard=true;isPublic=true">
        <h3>+</h3>
      </button>
    </div>
    <window-overlay v-if="isAddNewBoard" @close="isAddNewBoard=false"></window-overlay>
    <add-board v-if="isAddNewBoard" :public="isPublic" @addNewBoard="addNewBoard"></add-board>
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
      user: {},
      boards: [],
      isAddNewBoard: false,
      isPublic: true
    };
  },
  created() {
    this.user = this.$store.getters.loggedinUser;
    this.getBoardsFromStore();
    const htmlClassList = document.body.parentElement.classList;
    htmlClassList.remove('set1')
    htmlClassList.remove('set2')
    htmlClassList.remove('set3')
    htmlClassList.remove('set4')

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
      this.$store
        .dispatch({
          type: "addBoard",
          user: this.$store.getters.loggedinUser,
          prefs: prefs
        })
        .then(board => {
          this.$router.push("/" + board._id);
        });
    }
  },
  computed: {
    UserBoards() {
      return this.boards.filter(board => board.onUser);
    },
    publicBoard() {
      return this.boards.filter(board => !board.onUser);
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

<style>
</style>
