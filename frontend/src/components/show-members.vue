<template>
  <div class="show-members-container">
    <h3>Members</h3>
    <div v-for="member in members" :key="member._id">
      <img :src="member.avatar" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    members: Array
  }
};
</script>
