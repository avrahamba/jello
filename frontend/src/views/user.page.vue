<template>
  <div class="user-page">
    <h1>User Page</h1>
    <div v-for="board in user.boards" :key="board._id">
      <h3>board id:{{board._id}}</h3>
      <h3>name:{{board.name}}</h3>
      <h3>color:{{board.background}}</h3>
      <button @click="addNewBoard">Add new board</button>
      <!-- add modal for new board - create button will fire an action to board store (addBoard(user)) -->

      <router-link v-for="board in boards" :key="board._id" :to="'/'+board._id">{{board.title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-page",
  data() {
    return {
      user: this.loggedinUser,
      boards: [],
      prefs: { title: "test for new board", style: { background: "#FFFFF" } }
    };
  },
  created() {
    this.user = this.$store.getters.loggedinUser;
    this.$store
      .dispatch({
        type: "getBoards",
        userId: this.$store.getters.loggedinUser._id
      })
      .then(boards => (this.boards = boards));
  },
  methods: {
    addNewBoard() {
      this.$store
        .dispatch({
          type: "addBoard",
          user: this.$store.getters.loggedinUser,
          prefs: this.prefs
        })
        .then(() => {
          this.$store
            .dispatch({
              type: "getBoards",
              userId: this.$store.getters.loggedinUser._id
            })
            .then(boards => (this.boards = boards));
        });
    }
  }
};
</script>