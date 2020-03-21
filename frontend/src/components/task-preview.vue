<template>
<div>
    
<router-link :to="'/task/'+task.id">
    <section class="task-preview">
        {{task.title}}
    </section>
</router-link>
</div>
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
