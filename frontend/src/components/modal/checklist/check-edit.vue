<template>
<section class="ceck-edit">
    <input ref="txtInput" @blur="add" @keydown.enter="add" @keydown.esc="close" type="text" placeholder="Add an item" v-model="txt">
</section>
</template>

<script>
export default {
    props: {
        checkItemTxt: { type: String, default: '' }
    },
    created() {
        if (this.checkItemTxt) this.txt = this.checkItemTxt
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
        add(ev) {
            if (this.txt){
                this.$emit('add', this.txt)
                this.txt = ''
            }
            else this.close()
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
