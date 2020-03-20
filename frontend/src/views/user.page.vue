<template>
  <div class="user-page">
    <h1>User Page</h1>
    <div v-for="board in user.boards" :key="board._id">
    <h3>board id:{{board._id}}</h3>
    <h3>name:{{board.name}}</h3>
    <h3>color:{{board.background}}</h3>
    </div>
    <pre>{{user}}</pre>
  </div>
</template>

<script>

export default {
  name: "user-page",
  data() {
    return {
      user: this.loggedinUser
    };
  },
  created() {
    console.log("this.loggedinUser", this.user);
    this.user =this.$store.getters.loggedinUser;
  },
  methods: {}
};
</script>