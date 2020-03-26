<template>
<section class="task-preview-container">
    <router-link :to="'/task/'+task.id">
        <section class="task-preview">
            <img v-if="coverUrl" :src="coverUrl" alt="task.title" />
            <div class="details">
                <div class="label-container" v-if="labels.length">
                    <span class="label" v-for="labelColor in labels" :key="labelColor" :style="{'background-color': labelColor}"></span>
                </div>
                <h4>{{task.title}}</h4>

                <div class="mini-details">
                    <div class="oders">
                        <i v-if="desc" class="fa fa-align-left"></i>
                        <span v-if="dueDate">{{dueDate}}</span>
                        <span v-if="checks">
                            <i class="far fa-check-square"></i>
                            {{finishChecks}}/{{checks}}
                        </span>
                        <span v-if="attachment">
                            <i class="fa fa-image"></i>
                            {{attachment}}
                        </span>
                        <span v-if="msgsCount">
                            <i class="far fa-comment-alt"></i>
                            {{msgsCount}}
                        </span>
                    </div>
                    <span class="users" v-if="users.length">
                        <avatar-user v-for="(user) in users" :key="user.id" :user="user"></avatar-user>
                    </span>
                </div>
            </div>
        </section>
    </router-link>
</section>
</template>

<script>
import avatarUser from "./avatar-user.vue";
import moment from "moment";
export default {
    props: {
        task: Object
    },
    computed: {
        checks() {
            return this.task.checklists.reduce(
                (acc, checklist) => acc + checklist.checkItems.length,
                0
            );
        },
        finishChecks() {
            return this.task.checklists.reduce(
                (acc, checklist) =>
                acc +
                checklist.checkItems.filter(checkItem => checkItem.isDone).length,
                0
            );
        },
        labels() {
            return this.task.labels.map(label => label.color);
        },
        users() {
            return this.task.members;
        },
        desc() {
            return !!this.task.desc;
        },
        msgsCount() {
            return this.task.msgs.length;
        },
        attachment() {
            return this.task.attachments.length;
        },
        coverUrl() {
            if (this.task.cover) {
                return this.task.cover.url;
            }
            return false;
        },
        dueDate() {
            const dateString = this.task.dueDate[1];
            if (dateString) {
                const date = new Date(dateString);
                const dateToShow = moment(date)
                    .format("ll")
                    .split(",")[0];
                return dateToShow;
            }
            return false;
        }
    },
    components: {
        avatarUser
    }
};
</script>

<style>
</style>
