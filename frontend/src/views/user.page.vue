<template>
  <div class="user-page">
    <h1>User Page</h1>
    <div v-for="board in user.boards" :key="board._id">
      <h3>board id:{{board._id}}</h3>
      <h3>name:{{board.name}}</h3>
      <h3>color:{{board.background}}</h3>
      <button @click="addNewBoard">Add new board</button>
    </div>
    <!-- add modal for new board - create button will fire an action to board store (addBoard(user)) -->
    <div class="cards-container">
      <board-card
        v-for="board in boards"
        :board="board"
        :key="board._id"
        :class="'board-card '+board.title"
        data-image="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop="
      >
          <h1 slot="header">{{board.title}}</h1>
          <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
         <!-- <add-members
            slot="add-members"
            v-if="board.isAddMembers"
            @filter="filter"
            @updateBoard="updateBoard"
            :users="users"
            :currBoard="board"
          ></add-members>
          <button
            class="add-member-btn"
            slot="add-member-btn"
            @click="addMembers(board)"
          >Add Memebers</button>-->
      </board-card>
    </div>
  </div>
</template>

<script>
import addMembers from "../components/add-members.vue";
import boardCard from "../components/board-card.vue";
export default {
  name: "user-page",
  data() {
    return {
      user: this.loggedinUser,
      boards: [],
      prefs: {
        title: "test ron",
        style: { background: "#FFFFF" },
        public: true
      }
    };
  },
  created() {
    console.log(this.boards);
    this.user = this.$store.getters.loggedinUser;
    console.log(this.loggedinUser);
    this.getBoardsFromStore();
  },
  methods: {

    addMembers(board) {
      board.isAddMembers = !board.isAddMembers;
    },
    getBoardsFromStore() {
      this.$store
        .dispatch({
          type: "getBoards",
          userId: this.$store.getters.loggedinUser._id
        })
        .then(boards => (this.boards = boards));
    },
    addNewBoard() {
      this.$store.dispatch({
        type: "addBoard",
        user: this.$store.getters.loggedinUser,
        prefs: this.prefs
      });
      this.getBoardsFromStore();
    }
  },
  components: {
    addMembers,
    boardCard
  }
};
</script>
<style lang="scss">
.cards-container {
  padding: 40px 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>