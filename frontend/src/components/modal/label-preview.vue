<template>
    <section v-if="value" class="label-preview">
    <h3>Label</h3>
    <div class="labels-container">
    <div class="label"
        v-for="label in labels"
        :key="label.id"
        :type="label.type"
        :style="{'background-color':label.color}"
        @click="openLabelPiker(label)"
    >
      {{label.name}}
      <label-picker @close="label.inEdit=false" v-if="label.inEdit"></label-picker>
    </div>
    <button @click="openLabelPiker" class="add-Label">+</button>
    </div>
    <pre>
      {{labelsActive}}
    </pre>
    <!-- <el-tag
      class="labels-container"
      v-for="label in labelsActive"
      :key="label.id"
      closable
      :type="label.type"
      size="mini"
      effect="dark"
      @close="handleClose(label.id)"
    >{{label.name}}</el-tag> -->
  </section>

</template>

<script>
import labelPicker from './label-picker.vue';
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
    },
    openLabelPiker(label){
      label.inEdit =!label.inEdit
    }
  },
  computed: {
    labelsActive() {
      if (this.labels.length) {
        return this.labels.filter(label => label.isActive);
      }
    }
  },
  components:{
    labelPicker
  }

}
</script>

<style>
</style>