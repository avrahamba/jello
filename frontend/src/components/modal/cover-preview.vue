<template>
  <section class="cover-preview">
    <img v-if="cover.url" :src="cover.url" alt />
  </section>
</template>

<script>
export default {
  props: {
    cover: Object
  }
};
</script>

<style>
</style>