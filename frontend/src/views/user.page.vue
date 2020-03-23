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
        <button @click="addMembers">Add Memebers</button>
        <router-link :to="'/'+board._id">{{board.title}}</router-link>
        <add-members v-if="isAddMembers"></add-members>
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
      isAddMembers: false,
      boards: [],
      prefs: {
        title: "test for new board",
        style: { background: "#FFFFF" },
        public: true
      }
    };
  },
  created() {
    this.user = this.$store.getters.loggedinUser;
    this.getBoardsFromStore();
  },
  methods: {
    addMembers() {
      this.isAddMembers = !this.isAddMembers;
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