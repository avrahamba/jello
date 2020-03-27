<template>
<section class="add-members">
    <div class="search-form">
        <div v-if="userFilter.txt" class="select-user">
            <div class="search-option" @click="addMember(user)" v-for="user in usersToView" :key="user._id" :value="user">{{user.name}}</div>
        </div>

        <input type="search" class="search-input" @blur="close" @input="filter" placeholder="Add User" v-model="userFilter.txt" />
        <button class="search-button">
            <svg class="submit-button" viewBox="0 0 30 30">
                <path d="M 19.5 3 C 14.26514 3 10 7.2651394 10 12.5 C 10 14.749977 10.810825 16.807458 12.125 18.4375 L 3.28125 27.28125 L 4.71875 28.71875 L 13.5625 19.875 C 15.192542 21.189175 17.250023 22 19.5 22 C 24.73486 22 29 17.73486 29 12.5 C 29 7.2651394 24.73486 3 19.5 3 z M 19.5 5 C 23.65398 5 27 8.3460198 27 12.5 C 27 16.65398 23.65398 20 19.5 20 C 15.34602 20 12 16.65398 12 12.5 C 12 8.3460198 15.34602 5 19.5 5 z" />
            </svg>
        </button>

    </div>

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
            currBoardUsersCopy.push(miniUser)
            this.$emit("updateBoardUsers", currBoardUsersCopy);
            this.userFilter.txt = ''
        },
        close(){
            setTimeout(()=>{
            this.userFilter.txt = ''
            },200)
        }
    },
    computed: {
        usersToView() {
            return this.users.filter(currUser =>
                !this.currBoardUsers.find(currUserBoard =>
                    currUserBoard._id === currUser._id
                )
            )
        }
    },
};
</script>

<style>
</style>
