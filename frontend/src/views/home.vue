<template>
  <div class="home">
    <router-link to="/signup">Sign Up</router-link>|
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>

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
  },
};
</script>
