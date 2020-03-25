<template>
  <section ref="container" class="cover-picker">
    <h3>covers</h3>
    <div class="covers" v-if="covers">
      <div class="cover" v-for="(cover,idx) in covers" :key="cover.url" @click="set(cover)">
        <img v-if="cover.url" :src="cover.url" alt />
        <span class="selected" v-if="isCovers[idx]">✔️</span>
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

  methods: {
    set(cover) {
      this.cover = cover;
      this.$emit("input", this.cover);
    }
  },
  computed: {
    isCovers() {
      return this.covers.map(cover => cover.url === this.cover.url);
    }
  }
};
</script>
