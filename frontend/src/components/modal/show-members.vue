<template>
  <div class="show-members">
    <div class="avatar" v-for="member in members" :key="member._id">
      <avatar-user :key="member.id" :user="member"></avatar-user>
      <!-- 
      <img v-if="member.avatar&&member.avatar.includes('.com')" :src="member.avatar" />
      <span v-else>{{member.name|short-name}}</span>-->
    </div>
  </div>
</template>

<script>
import avatarUser from "../avatar-user.vue";
export default {
  data() {
    return {};
  },
  props: {
    members: Array
  },
  components: { avatarUser }
};
</script>
