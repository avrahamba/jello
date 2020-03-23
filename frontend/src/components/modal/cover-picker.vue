<template>
  <section ref="container" class="cover-picker">
    <h3>covers</h3>
    <div class="covers">
      <div
        class="cover"
        v-for="(cover,idx) in covers"
        :key="cover.file.uid"
        @click="set(cover,idx)"
      >
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
      cover: this.value,
      coverActiveIdx: null
    };
  },
  created() {
    setTimeout(() => {
      this.$refs.container.focus();
    }, 0);
  },
  methods: {
    set(cover, idx) {
      this.cover = cover;
      this.$emit("input", this.cover);
    }
  }
};
</script>
<style>
.cover {
  width: 50px;
  height: 50px;
}
</style>

