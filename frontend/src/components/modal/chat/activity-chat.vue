<template>
  <section class="activity-chat">
    <massage-write :user="user" @new-msg="newMsg"></massage-write>
    <massage-preview
      v-for="(msg, idx) in massages"
      :key="msg.createAt"
      :msg="msg"
      :user="user"
      @remove="removeMsg(idx)"
      @save-msg="saveMsg(idx,$event)"
    ></massage-preview>
  </section>
</template>

<script>
import massagePreview from "./massage-preview.vue";
import massageWrite from "./massage-write.vue";
export default {
  props: {
    massages: Array,
    user: Object
  },
  components: {
    massagePreview,
    massageWrite
  },
  methods: {
    newMsg(msg) {
      const massages = JSON.parse(JSON.stringify(this.massages));
      massages.unshift(msg);
      this.$emit("save", JSON.parse(JSON.stringify(massages)));
    },
    removeMsg(idx) {
      const massages = JSON.parse(JSON.stringify(this.massages));
      massages.splice(idx, 1);
      this.$emit("save", JSON.parse(JSON.stringify(massages)));
    },
    saveMsg(idx, msg) {
      const massages = JSON.parse(JSON.stringify(this.massages));
      massages.splice(idx, 1, msg);
      this.$emit("save", JSON.parse(JSON.stringify(massages)));
    }
  },
  computed: {

  }
};
</script>

<style>
</style>
