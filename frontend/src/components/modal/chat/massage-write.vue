<template>
  <section class="massage-write">
    <div class="avatar">
      <img v-if="user.avatar&&user.avatar.includes('.com')" :src="user.avatar" />
      <span v-else>{{user.name|short-name}}</span>
    </div>
    <form @submit.prevent="send">
      <div class="comment-frame">
        <div class="comment-box">
          <input class="activity-input" v-model="msg.txt" placeholder="Write a comment..." />

          <button>Save</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    user: Object,
    editMsg: Object
  },
  data() {
    return {
      msg: {
        user: null,
        txt: ""
      }
    };
  },
  methods: {
    send() {
      if (!this.msg.txt) return;
      this.msg.createdAt = this.editMsg ? this.editMsg.createdAt : Date.now();
      this.$emit("new-msg", this.msg);
      this.msg.txt = "";
    }
  },
  created() {
    this.msg.user = {
      _id: this.user._id,
      name: this.user.name,
      avatar: this.user.avatar
    };
    if (this.editMsg) this.msg.txt = this.editMsg.txt;
  }
};
</script>

<style>
/* {
    "txt": "txt",
    "creatAt": 4535345345,
    "user": {
        "_id": "",
        "name": "",
        "avatar": "/cloudinary/"
    }
} */
</style>
