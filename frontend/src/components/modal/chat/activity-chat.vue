<template>
<section class="activity-chat">
    <h3>Activity</h3>
    <massage-write :user="user"></massage-write>
    <!-- <pre>
      {{user}}
    </pre> -->
</section>
</template>

<script>
import massagePreview from './massage-preview.vue';
import massageWrite from './massage-write.vue';
export default {
    props: {
        massage: Array,
        user:Object
    },
    created() {
      console.log('object');
      console.log('user :', this.user);
    },
    components: {
        massagePreview,
        massageWrite
    }
}
</script>

<style>

</style>
