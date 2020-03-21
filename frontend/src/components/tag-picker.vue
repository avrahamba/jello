<template>
  <section>
    <el-tag v-for="label in labels" :key="label.name" closable :type="label.type">{{label.name}}</el-tag>
  </section>
</template>


<script>
export default {
  data() {
    return {
      labels: this.value
    };
  },
  props: {
    value: Array
  },
  created() {}
};
</script>