<template>
  <section ref="container" class="mini-modal">
    <h3>Members to Add</h3>
    <ul>
      <li v-for="user in board.users" :key="user._id" @click="addMemberToTask(user)">{{user.name}}</li>
    </ul>
  </section>
</template>

<script>
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
      this.board
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
  }
};
</script>
