<template>
  <section ref="container" class="label-picker">
    <h3>New Modal</h3>
   <input type="text" placeholder="">
  </section>
</template>

<script>
export default {

  data() {
    return {
      prefsObj: {
           title: "choose title",
        style: { background: "#FFFFF" },
        public: true
      }
    };
  },
  created() {
      
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
