<template>
<div class="login-container">
    <div class="login">
        <div class="bg"></div>

        <form @submit.prevent="doLogin">
            <header>
                <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/reading_0re1.svg" />
            </header>

            <div class="inputs">
                <input type="email" name placeholder="Email" v-model="loginCred.email" required />
                <input type="password" name placeholder="Password" v-model="loginCred.password" required />
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
</div>
</template>

<script>
export default {
    name: "test",
    data() {
        return {
            loginCred: {
              email:'',
              password:''
            },
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
      if(this.loggedinUser)this.$router.push({ path: "/userPage" })
    },
    methods: {
        async doLogin() {
          const cred = this.loginCred;
            if (!cred.email || !cred.password){
              return (this.msg = "Please enter user/password");
            }

            await this.$store.dispatch({ type: "login", userCred: cred })
            .then(()=>this.$router.push({ path: "/userPage" }))
            
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
