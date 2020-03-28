<template>
  <section class="massage-preview">
    <div class="avatar">
      <span class="name">{{msg.user.name}} :</span>
      <span class="time">{{msg.createdAt| date}}</span>
    </div>
    <div class="contain">
      <template v-if="!inEdit">
        <p class="text" @click="inEdit = true">{{msg.txt}}</p>

        <!-- <div v-if="isUser" class="action">
          <a @click="inEdit = true" href="#">
            <i class="fas fa-edit"></i>
          </a>

          <a @click="remove" href="#">
            <i class="fas fa-trash-alt"></i>
          </a>
        </div>-->
      </template>
      <massage-write class="edit-msg" v-else :editMsg="msg" :user="user" @new-msg="saveMsg"></massage-write>
    </div>
  </section>
</template>

<script>
import massageWrite from "./massage-write.vue";
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
    massageWrite
  }
};
</script>

<style>
</style>
