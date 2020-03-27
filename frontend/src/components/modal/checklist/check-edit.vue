<template>
<section class="ceck-edit">
    <input ref="txtInput" @keydown.enter="add" @keydown.esc="close" type="text" placeholder="Add an item" v-model="txt">
    <div class="btns">

    <button @click="add">
        <i class="far fa-save"></i>
    </button>
    <button class="x" @click="close">&times;</button>
    </div>

</section>
</template>

<script>
export default {
    props:{
        checkItemTxt:{type:String, default:''}
    },
    created() {
        if(this.checkItemTxt)this.txt = this.checkItemTxt
    },
    mounted() {
        this.$refs.txtInput.focus()
    },
    data() {
        return {
            txt: ''
        }
    },
    methods: {
        add() {
            if(this.txt||this.checkItemTxt)
            this.$emit('add', this.txt)
        },
        close() {
            this.txt = ''
            this.$emit('close')
        }
    },
}
</script>

<style>

</style>
