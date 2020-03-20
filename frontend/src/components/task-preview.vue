<template>
<router-link :to="'/task/'+task.id">
    <section class="task-preview">
        {{task.title}}
    </section>
</router-link>
</template>

<script>
/* eslint-disable */
export default {
    props: {
        task: Object
    }
}
</script>

<style>

</style>
