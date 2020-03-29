<template>
  <div class="login-container">
    <div class="login">
      <div class="bg"></div>

      <form @submit.prevent="doLogin">
        <header>
          <img
            src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/reading_0re1.svg"
          />
        </header>

        <div class="inputs">
          <input type="text" name placeholder="Email" v-model="signupCred.email" required />
          <input type="password" name placeholder="Password" v-model="signupCred.password" required />
        </div>
        <button class="login-btn">Login</button>
      </form>

      <footer>
        <p>
          Don't have an account?
          <router-link to="/signup">
            <a href="#">Sign Up</a>
          </router-link>
        </p>
      </footer>
    </div>

    <!--
    <h2>{{msg}}</h2>
    <div v-if="loggedinUser">
      <h3>
        Loggedin User: 
        {{loggedinUser.username}}
        <form @submit.prevent="updateUser">
          <input type="text" v-model="userToEdit.username" />
        </form>
        <router-link to="/userPage"><button>User Page</button></router-link>
        <button @click="doLogout">Logout</button>
      </h3>
    </div>
    <div v-else>
    <form  @submit.prevent="doLogin">
      <input type="text" v-model="loginCred.email" placeholder="Email">
      <br />
      <input type="text" v-model="loginCred.password" placeholder="Password">
      <br />
      <button>Login</button>
    </form>
    </div>
    <hr />
    <button @click="getAllUsers">Get All Users</button>
    <ul>
      <li v-for="user in users" :key="user._id">
        <pre>{{user}}</pre>
        <button @click="removeUser(user._id)">x</button>
      </li>
    </ul>-->
  </div>
</template>

<script>
export default {
  name: "test",
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
  created() {},
  methods: {
    async doLogin() {
      const cred = this.loginCred;
      if (!cred.email || !cred.password)
        return (this.msg = "Please enter user/password");
      await this.$store.dispatch({ type: "login", userCred: cred });
      this.loginCred = {};
      this.$router.push({ path: "/userPage" });
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
    getAllUsers() {
      this.$store.dispatch({ type: "loadUsers" });
    },
    removeUser(userId) {
      this.$store.dispatch({ type: "removeUser", userId });
    },
    updateUser() {
      this.$store.dispatch({ type: "updateUser", user: this.userToEdit });
    }
  },
  watch: {
    loggedinUser() {
      this.userToEdit = { ...this.loggedinUser };
    }
  }
};
</script>