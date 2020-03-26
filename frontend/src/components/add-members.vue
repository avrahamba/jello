<template>
<section class="add-members-container">
    <!-- <label>
      <el-input ></el-input>
      <div class="users-container">
        <label for="users">Members to add:</label>
        <select id="users" v-model="currUserToAdd">
          <option v-for="user in users" :key="user._id" :value="user">{{user.name}}</option>
        </select>
        <button @click="addMember(currUserToAdd)">Add</button>
      </div>
    </label>-->

    <form v-on:submit.prevent="addMember(currUserToAdd)" class="search-form">
        <input type="search" class="search-input" @input="filter" placeholder="Name" v-model="userFilter.txt" />
        <select class="select-user" id="users" v-model="currUserToAdd">
            <option v-for="user in users" :key="user._id" :value="user">{{user.name}}</option>
        </select>
        <button type="submit" class="search-button">
            bcvbcbc
            <svg class="submit-button">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search" />
            </svg>
        </button>
        <div class="search-option">
            <div></div>
        </div>
    </form>

    <symbol id="search" viewBox="0 0 32 32">
        <path d="M 19.5 3 C 14.26514 3 10 7.2651394 10 12.5 C 10 14.749977 10.810825 16.807458 12.125 18.4375 L 3.28125 27.28125 L 4.71875 28.71875 L 13.5625 19.875 C 15.192542 21.189175 17.250023 22 19.5 22 C 24.73486 22 29 17.73486 29 12.5 C 29 7.2651394 24.73486 3 19.5 3 z M 19.5 5 C 23.65398 5 27 8.3460198 27 12.5 C 27 16.65398 23.65398 20 19.5 20 C 15.34602 20 12 16.65398 12 12.5 C 12 8.3460198 15.34602 5 19.5 5 z" />
    </symbol>

    <div></div>
</section>
</template>

<script>
export default {
    props: {
        users: { type: Array },
        currBoardUsers: { type: Array }
    },
    data() {
        return {
            userFilter: {
                txt: ""
            },
            currUserToAdd: {}
        };
    },
    methods: {
        filter() {
            this.$emit("filter", this.userFilter);
        },
        addMember(user) {
            const miniUser = {
                _id: user._id,
                name: user.name,
                email: user.email
            };
            const currBoardUsersCopy = JSON.parse(JSON.stringify(this.currBoardUsers))
            let isSameUser = currBoardUsersCopy.find(user => {
                return user._id === miniUser._id;
            });

            if (!isSameUser) {
                currBoardUsersCopy.push(miniUser)
                this.$emit("updateBoardUsers", currBoardUsersCopy);
            }
        }

    },
};
</script>

<style>
</style>
