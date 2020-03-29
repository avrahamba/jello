<template>
  <div class="signup-container">
    <div class="signup">
      <div class="bg"></div>

      <form @submit.prevent="doSignup">
        <header>
          <img
            src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/reading_0re1.svg"
          />
        </header>

        <div class="inputs">
          <input type="text" placeholder="Email" v-model="signupCred.email" required />
          <input type="text" placeholder="User Name" v-model="signupCred.username" required />
          <input type="password" placeholder="Password" v-model="signupCred.password" required />
        </div>
        <button class="signup-btn">Signup</button>
      </form>

      <footer>
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
  },
  methods: {
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
    async doSignup() {
      const cred = this.signupCred;
      if (!this.validateEmail(cred.email) || !cred.password || !cred.username) {
        return (this.msg = "Please fill up the form");
      } else {
        await this.$store.dispatch({ type: "signup", userCred: cred });
        this.$router.push({ path: "/userPage" });
      }
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