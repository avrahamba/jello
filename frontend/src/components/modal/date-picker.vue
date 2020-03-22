<template>
  <div class="date-container" v-if="value">
    <h3>Due Date</h3>
    <el-date-picker
      class="date-picker-container"
      v-model="date"
      type="daterange"
      range-separator="To"
      @change="pickDate"
      default-value="2010-10-01"
      start-placeholder="Start date"
      end-placeholder="End date"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: this.values
    };
  },
  props: {
    value: Array
  },
  methods: {
    pickDate() {
      this.$emit("input", this.date);
    }
  }
};
</script>
