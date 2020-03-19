<template>
  <div class="user-page">
    <h1>User Page</h1>
    <h1>{{user}}</h1>
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
  computed: {
    loggedinUser() {}
  },
  created() {
    console.log("this.loggedinUser", this.user);
    debugger;
    var x = this.$store.getters.loggedinUser;
    debugger
    this.user = x;
  },
  methods: {}
};
</script>