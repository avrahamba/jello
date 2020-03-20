<template>
  <div class="user-page">
    <h1>User Page</h1>
    <div v-for="board in user.boards" :key="board._id">
      <h3>board id:{{board._id}}</h3>
      <h3>name:{{board.name}}</h3>
      <h3>color:{{board.background}}</h3>
      <router-link :to="'/'+board._id">
        {{board.name}}
    </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-page",
  data() {
    return {
      user: this.loggedinUser,
      boards: []
    };
  },
  created() {
    console.log("this.loggedinUser", this.user);
    this.user = this.$store.getters.loggedinUser;
    this.$store
      .dispatch({
        type: "getBoards",
        userId: this.$store.getters.loggedinUser.id
      })
      .then(boards => (this.boards = boards));
  },
  methods: {}
};
</script>