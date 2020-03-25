<template>
<section class="task-preview">

    <router-link :to="'/task/'+task.id">
        <div class="">

            <div class="label-container" v-if="labels.length">
                <span class="label" v-for="labelColor in labels" :key="labelColor" :style="{'background-color': labelColor}">
                    <!-- {{labelColor}} -->
                </span>
            </div>
            <h4> {{task.title}} </h4>

            <div class="mini-details">

                <span v-if="checks">
                    <i class="fa fa-check-square"></i>{{finishChecks}}/{{checks}}
                </span>
                <span class="users" v-if="users">
                    <avatar-user v-for="(user) in users" :key="user.id" :user="user"></avatar-user>
                </span>
            </div>

        </div>

    </router-link>
</section>
</template>

<script>
import avatarUser from './avatar-user.vue';
export default {
    props: {
        task: Object
    },
    computed: {
        checks() {
            return this.task.checklists.reduce(
                (acc, checklist) => acc + checklist.checkItems.length, 0)
        },
        finishChecks() {
            return this.task.checklists.reduce(
                (acc, checklist) => acc + checklist.checkItems.filter(
                    checkItem => checkItem.isDone
                ).length, 0)
        },
        labels() {
            return this.task.labels.map(label => label.color)
        },
        users() {
            return this.task.members
        }
    },
    components: {
        avatarUser
    }
}
</script>

<style>
</style>
