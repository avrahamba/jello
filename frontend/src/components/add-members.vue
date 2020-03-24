<template>
  <section class="add-members-container">
    <label>
      <el-input @input="filter" placeholder="Name" v-model="userFilter.txt"></el-input>
      <div class="users-container">
        <label for="users">Members to add:</label>
        <select id="users" v-model="currUserToAdd">
          <option v-for="user in users" :key="user._id" :value="user">{{user.name}}</option>
        </select>
        <button @click="addMember(currUserToAdd)">Add</button>
      </div>
    </label>
    <div></div>
  </section>
</template>
<script>
export default {
  props: {
    users: { type: Array },
    currBoard: { type: Object }
  },
  data() {
    return {
      userFilter: {
        txt: ""
      },
      updatedMiniBoard: {},
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
      const boardId = this.updatedMiniBoard._id;
      this.$store.dispatch({ type: "getBoard", boardId }).then(board => {
        let updatedBoard = board;
        debugger;
        let isSameUser = updatedBoard.users.find(user => {
          return user._id === miniUser._id;
        });
        if (!isSameUser) {
          updatedBoard.users.push(miniUser);
          this.$emit("updateBoard", updatedBoard);
        }
      });
    }
  },
  created() {
    this.updatedMiniBoard = JSON.parse(JSON.stringify(this.currBoard));
  }
};
</script>
<style>
</style>
