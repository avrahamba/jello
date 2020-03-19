<template>
<div class="user-page">
<h1>{{user}}</h1>
</div>
</template>

<script>
export default {
  name: "user-page",
  data() {
    return {
      user: this.loggedinUser()
    };
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  },
  created() {
    console.log("this.loggedinUser", this.loggedinUser);
  },
  methods: {
  },
};
</script>