<template>
<div class="task-preview">
    
<router-link :to="'/task/'+task.id">
    <section >
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
