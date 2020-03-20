<template>
  <div class="signup">
    <h2>{{msg}}</h2>
    <div v-if="loggedinUser">
      <h3>
        Loggedin User:
        {{loggedinUser.username}}
        <form @submit.prevent="updateUser">
          <input type="text" v-model="userToEdit.username" />
        </form>
        <button @click="doLogout">Logout</button>
      </h3>
    </div>
    <div v-else>
      <form @submit.prevent="doSignup">
        <input type="text" v-model="signupCred.email" placeholder="Email" />
        <br />
        <input type="text" v-model="signupCred.password" placeholder="Password" />
        <br />
        <input type="text" v-model="signupCred.username" placeholder="Username" />
        <br />
        <button>Signup</button>
      </form>
    </div>
    <hr />
    <button @click="getAllUsers">Get All Users</button>
    <ul>
      <li v-for="user in users" :key="user._id">
        <pre>{{user}}</pre>
        <button @click="removeUser(user._id)">x</button>
      </li>
    </ul>
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
  created() {
    console.log("this.loggedinUser", this.loggedinUser);
  },
  methods: {
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
    async doSignup() {
      const cred = this.signupCred;
      if (!cred.email || !cred.password || !cred.username)
        return (this.msg = "Please fill up the form");
      await this.$store.dispatch({ type: "signup", userCred: cred });
      this.$router.push({ path: "/userPage" });
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