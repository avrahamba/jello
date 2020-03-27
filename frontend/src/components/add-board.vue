<template>
  <section ref="container" class="label-picker">
    <h3>New Board</h3>
    <h4>Title</h4> 
   <input type="text" placeholder="title" v-model="prefsObj.title">
    <h4>Choose color or Background </h4> 
   <input type="color" v-model="prefsObj.style.background">
   <!-- upload pic -->
   <button @click="addNewBoard">Add!</button>
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
   addNewBoard(){
       debugger
       this.$emit("addNewBoard", this.prefsObj);
   }
  }
};
</script>
