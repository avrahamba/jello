<template>
  <section ref="container" class="cover-picker">
    <h3>covers</h3>
    <div class="covers" v-if="covers">
      <div class="cover" v-for="(cover) in covers" :key="cover.file.uid" @click="set(cover)">
        <img v-if="cover.url" :src="cover.url" alt />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    value: Object,
    covers: Array
  },

  data() {
    return {
      cover: this.value
    };
  },
  created() {
    setTimeout(() => {
      this.$refs.container.focus();
    }, 0);
  },
  methods: {
    set(cover) {
      this.cover = cover;
      this.$emit("input", this.cover);
    }
  }
};
</script>


