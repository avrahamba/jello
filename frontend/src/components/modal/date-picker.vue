<template>
  <div class="date-container">
  <h3>Due Date</h3>
    <el-date-picker class="date-picker-container"
      v-model="value"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
      };
    }
  };
</script>
