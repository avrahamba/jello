<template>
  <div class="signup-container">
    <div class="signup">
      <div class="bg"></div>

      <form>
        <header>
          <img
            src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/reading_0re1.svg"
          />
        </header>

        <div class="inputs">
          <input type="text" name placeholder="Email" v-model="signupCred.email" />
          <input type="text" name placeholder="User Name" v-model="signupCred.username" />
          <input type="password" name placeholder="Password" v-model="signupCred.password" />
        </div>
      </form>

      <footer>
        <button class="signup-btn" @click="doSignup">Signup</button>
        <p>
          Do you have an account already?
          <router-link to="/login">
            <a href="#">Login</a>
          </router-link>
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "signup",
  data() {
    return {
      loginCred: {},
      signupCred: {},
      msg: "",
      userToEdit: {}
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  },
  created() {
    console.log("this.loggedinUser", this.loggedinUser);
  },
  methods: {
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
    async doSignup() {
      const cred = this.signupCred;

      if (this.validateEmail(cred.email) || !cred.password || !cred.username)
        return (this.msg = "Please fill up the form");
      await this.$store.dispatch({ type: "signup", userCred: cred });
      this.$router.push({ path: "/userPage" });
    },
    validateEmail(email) {
      let res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return res.test(String(email).toLowerCase());
    }
  },
  watch: {
    loggedinUser() {
      this.userToEdit = { ...this.loggedinUser };
    }
  }
};
</script>