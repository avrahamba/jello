<template>
<div class="show-members">
    <div class="avatar" v-for="member in members" :key="member._id">
        <img v-if="member.avatar&&member.avatar.includes('.com')" :src="member.avatar" />
        <span v-else>{{member.name|short-name}}</span>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {};
    },
    created() {
        this.members
    },
    props: {
        members: Array
    }
};
</script>
