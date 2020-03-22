<template>
  <div class="date-container">
  <h3>Due Date</h3>
    <el-date-picker class="date-picker-container"
      v-model="dueDate"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
      @change="save"
      >
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dueDate: this.value,
      };
    },
    props: {
    value: Array
  },
  methods: {
    save(){
      debugger
      this.dueDate
      this.$emit('input',this.dueDate)
    }
  },
  created(){
   
  }
  };
</script>
