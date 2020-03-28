<template>
  <section class="massage-write">
    <div class="avatar" v-if="!editMsg">
      <avatar-user :key="user.id" :user="user"></avatar-user>
    </div>
    <form @submit.prevent="send">
      <div class="comment-frame">
        <div class="comment-box">
          <textarea-autosize
            class="activity-input"
            placeholder="Write a comment..."
            ref="myTextarea"
            :min-height="5"
            v-model="msg.txt"
            :max-height="350"
            @blur.native="send"
          />
          <!-- <input
            class="activity-input"
            v-model="msg.txt"
            placeholder="Write a comment..."
            @blur="send"
          />-->
          <!-- <button>Save</button> -->
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import avatarUser from "../../avatar-user.vue";

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
    if (this.editMsg) {
      this.msg.txt = this.editMsg.txt;
    }
  },
  mounted() {
    if (this.editMsg) this.$refs.myTextarea.$el.focus();
  },
  components: {
    avatarUser
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
