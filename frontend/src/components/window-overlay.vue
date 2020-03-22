<template>
<section class="window-overlay" @click="close" :style="objStyle">

</section>
</template>

<script>
export default {
    props: {
        dark: { type: Boolean, default: true }
    },
    methods: {
        close() {
            this.$emit('close')
        }
    },
    computed: {
        objStyle() {
            if (this.dark) return {
                'background-color': '#000',
                opacity: 0.8
            }
        }
    },
}
</script>

<style>
.window-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
</style>
