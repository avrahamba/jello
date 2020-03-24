<template>
  <div class="user-page">
    <h1>User Page</h1>
    <div v-for="board in user.boards" :key="board._id">
      <h3>board id:{{board._id}}</h3>
      <h3>name:{{board.name}}</h3>
      <h3>color:{{board.background}}</h3>
      <button @click="addNewBoard">Add new board</button>
      <!-- add modal for new board - create button will fire an action to board store (addBoard(user)) -->
      <div :class="'board-card '+board.title" v-for="board in boards" :key="board._id">
        <button @click="addMembers(board)">Add Memebers</button>
        <router-link :to="'/'+board._id">{{board.title}}</router-link>
        <add-members v-if="board.isAddMembers" @filter="filter" @updateBoard="updateBoard" :users="users" :currBoard="board"></add-members>
      </div>
    </div>
  </div>
</template>

<script>
import addMembers from "../components/add-members.vue";
export default {
  name: "user-page",
  data() {
    return {
      user: this.loggedinUser,
      users: [],
      boards: [],
      prefs: {
        title: "test ron",
        style: { background: "#FFFFF" },
        public: true
      }
    };
  },
  created() {
    console.log(this.boards)
    this.user = this.$store.getters.loggedinUser;
    console.log(this.loggedinUser)
    this.filter({txt: ""},)
    this.getBoardsFromStore();
  },
  methods: {
    filter(userFilter) {
      this.$store
        .dispatch({ type: "loadFilter", userFilter })
        .then((users)=> {
          this.users = users;
        });
    },
    updateBoard(updatedBoard) {
      this.$store
        .dispatch({ type: "saveBoard", updatedBoard })
        .then(function(res) {
          console.log(res);
        });
    },
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
    addNewBoard() {
      this.$store.dispatch({
        type: "addBoard",
        user: this.$store.getters.loggedinUser,
        prefs: this.prefs
      });
      this.getBoardsFromStore();
    }
  },
  components: {
    addMembers
  }
};
</script>