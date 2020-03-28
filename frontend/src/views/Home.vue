<template>
  <div class="home">

  <div class="home-bg">
  </div>

    <div class="home-header">

    <div class="home-user">

    <router-link to="/login"><button class="login">Login</button></router-link>
    <router-link to="/signup"><button class="signup">Signup</button></router-link> 
    </div>

    <div class="home-main flex">

    <div class="home-text">
      <h1>Trello lets you work more collaboratively and get more done.</h1>
      <h2>Trello’s boards, lists, and cards enable you to organize and prioritize your projects in a fun, flexible, and rewarding way.</h2>
    </div>

    <div class="home-img">
    <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/308998dcb3ed5ab3d01217a4d24ffa03/hero-a.svg" alt="">
    </div>

    </div>
    </div>
  
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
  }
};
</script>
