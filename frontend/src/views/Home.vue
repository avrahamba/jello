<template>
  <div class="home">
    <h1>Home Page</h1>
    <router-link to="/signup">Sign Up</router-link>|
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    return {
      boards: []
    };
  },
  created() {
    if (this.$store.getters.loggedinUser) {
      this.$router.push({ path: "/userPage" });
    }
    // this.$store.dispatch({ type: 'getBoards',userId: this.$store.getters.loggedinUser.id })
    //     .then(boards => this.boards = boards)
  },
  components: {
    HelloWorld
  }
};
</script>
