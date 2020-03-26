<template>
<nav class="nav-board">
    <div class="board-controls">
        <button @click="changeTitle" class="board-title btn" :class="{action:editTitleMode}">
            <input ref="inputTitle" @blur="saveTitle" @keydown="onKeydownTitle" v-if="editTitleMode" type="text" :style="styleInputTitle" v-model="titleToChange">
            <h2 v-else>{{boardData.title}}</h2>
        </button>

        <button class="star-btn btn" aria-label="Star Board">
          <i class="far fa-star" aria-hidden="true"></i>
        </button>
        <add-members
          @filter="filter"
          @updateBoard="updateBoard"
          :users="users"
          :currBoard="boardData"
        ></add-members>
    </div>
    <button class="menu-btn btn"><i class="fas fa-ellipsis-h menu-btn-icon" aria-hidden="true"></i>Show Menu</button>


  </nav>
</template>

<script>
import addMembers from "./add-members.vue";
/* eslint-disable */
export default {
  props: {
    boardData: Object
  },
  data() {
    return {
      titleToChange: "",
      editTitleMode: false,
      users: []
    };
  },
  created() {},
  methods: {
    changeTitle() {
      this.editTitleMode = true;
      this.titleToChange = this.boardData.title;
      setTimeout(() => {
        this.$refs.inputTitle.focus();
      }, 0);
    },
    saveTitle() {
      this.$emit("changeTitle", this.titleToChange);
      this.editTitleMode = false;
    },
    onKeydownTitle(ev) {
            if (ev.key === 'Enter') this.saveTitle()
        },
    filter(userFilter) {
      this.$store
        .dispatch({ type: "loadFilter", userFilter })
        .then(users => {
            this.getUsersFromStore()
        });
    },
    updateBoard(updatedBoard) {
      this.$store.dispatch({ type: "saveBoard", updatedBoard }).then(res => {
        console.log(res);
      });
    },
    getUsersFromStore() {
      this.users = this.$store.getters.users;
    }
  },
    computed: {
        styleInputTitle() {
            return {
                width: this.titleToChange.length + 'ch'
            }
        }
    },

  
  computed: {
    
  },
  components: {
    addMembers
  }
};
</script>

<style>
</style>
