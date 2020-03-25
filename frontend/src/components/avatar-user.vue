<template>
<section class="avatar-user">
    <img v-if="user.avatar&&user.avatar.includes('.com')" :src="user.avatar" />
    <span class="txt" v-else>{{user.name|short-name}}</span>
</section>
</template>

<script>
export default {
    props: {
        user: Object
    }
}
</script>

<style>
.txt{
    background-color: #ccc;
    
}
</style>
