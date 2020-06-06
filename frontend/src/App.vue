<template>
<div id="app">
    <header-cmp />
    <router-view />

</div>
</template>

<script>
import headerCmp from '@/components/header-cmp.vue'
import { socketService } from './services/SocketService';
export default {
    created() {
        socketService.setup();
    },
    computed: {
        appClass() {
            if (this.$router)
                return
        }
    },
    components: {
        headerCmp
    }
}
</script>

<style lang="scss">
</style>
