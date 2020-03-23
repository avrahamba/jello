<template>
<section class="check-preview">
    <input v-model="isDone" @change="check" type="checkbox">
    <div class="text" @click="click">{{checkItem.txt}}</div>
</section>
</template>

<script>
export default {
    props: {
        checkItem: Object
    },
    data() {
        return {
            isDone: false
        }
    },
    created() {
        this.isDone = this.checkItem.isDone
    },
    methods: {
        click() {
            this.$emit('click')
        },
        check(){
            this.$emit('check',this.isDone)
        }
    },
}
</script>

<style>

</style>
