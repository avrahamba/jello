<template>
  <section ref="container" class="mini-modal">
    <h3>Members</h3>
    <ul class="members-users-list">
      <li v-for="user in board.users" :key="user._id" @click="addMemberToTask(user)">
        <avatar-user :key="user.id" :user="user"></avatar-user>
        <span class="user-name">{{user.name}}</span>
      </li>
    </ul>
  </section>
</template>

<script>
import avatarUser from "../avatar-user.vue";
export default {
  props: {
    value: Array,
    board: Object
  },

  data() {
    return {
      members: JSON.parse(JSON.stringify(this.value))
    };
  },
  created() {
    this.board;
  },
  methods: {
    addMemberToTask(user) {
      let isDuplicated = this.members.find(member => {
        return member._id === user._id;
      });
      if (!isDuplicated) {
        this.members.push(user);
        this.$emit("input", this.members);
      }
    }
  },
  components: {
    avatarUser
  }
};
</script>
