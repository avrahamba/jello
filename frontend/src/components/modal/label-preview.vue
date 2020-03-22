<template>
    <section v-if="value" class="label-preview">
    label
    <el-tag
      class="labels-container"
      v-for="label in labelsActive"
      :key="label.id"
      closable
      :type="label.type"
      size="mini"
      effect="dark"
      @close="handleClose(label.id)"
    >{{label.name}}</el-tag>
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
  methods: {
    handleClose(id) {
      this.labels[id].isActive = false;
    }
  },
  computed: {
    labelsActive() {
      if (this.labels.length) {
        return this.labels.filter(label => label.isActive);
      }
    }
  }

}
</script>

<style>

</style>