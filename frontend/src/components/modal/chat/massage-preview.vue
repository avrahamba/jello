<template>
  <section class="massage-preview">
    <div class="avatar">
      <avatar-user :key="msg.user.id" :user="msg.user"></avatar-user>
      <span class="name">{{msg.user.name}} :</span>
      <span class="time">{{msg.createdAt| date}}</span>
    </div>
    <div class="contain">
      <template v-if="!inEdit">
        <p class="text">{{msg.txt}}</p>
      </template>
      <massage-write class="edit-msg" v-else :editMsg="msg" :user="user" @new-msg="saveMsg"></massage-write>
    </div>
  </section>
</template>

<script>
import massageWrite from "./massage-write.vue";
import avatarUser from "../../avatar-user.vue";
import Avatar from "vue-avatar";

export default {
  props: {
    msg: Object,
    user: Object
  },
  data() {
    return {
      inEdit: false
    };
  },
  computed: {
    isUser() {
      return this.user._id === this.msg.user._id;
    }
  },
  methods: {
    remove() {
      this.$emit("remove");
    },
    saveMsg(msg) {
      this.inEdit = false;
      this.$emit("save-msg", msg);
    }
  },
  components: {
    massageWrite,
    avatarUser,
    Avatar
  }
};
</script>

<style>
</style>
