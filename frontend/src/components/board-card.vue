<template>
<section class="board-card" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" ref="card">
    <router-link :to="'/'+board._id">
        <div class="card" :style="cardStyle">
            <div class="card-bg" v-if="isImage" :style="[cardBgTransform, cardBgImage]"></div>
            <div class="card-bg" v-else :style="'background-color: '+dataImage+' ;'"></div>
            <div class="card-info">
                <h3>{{title}}</h3>
                <p>{{tasksInLists}}</p>
            </div>
        </div>
    </router-link>
</section>
</template>

<script>
export default {
    created() {
        if (this.dataImage.includes("http")) {
            this.isImage = true;
            this.dataImage
        }
    },
    mounted() {
        this.width = this.$refs.card.offsetWidth;
        this.height = this.$refs.card.offsetHeight;
    },
    props: { board: Object },
    data: () => ({
        width: 0,
        height: 0,
        mouseX: 0,
        mouseY: 0,
        mouseLeaveDelay: null,
        isImage: false
    }),
    computed: {
        mousePX() {
            return this.mouseX / this.width;
        },
        mousePY() {
            return this.mouseY / this.height;
        },
        cardStyle() {
            const rX = this.mousePX * 30;
            const rY = this.mousePY * -30;
            return {
                transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
            };
        },
        cardBgTransform() {
            const tX = this.mousePX * -40;
            const tY = this.mousePY * -40;
            return {
                transform: `translateX(${tX}px) translateY(${tY}px)`
            };
        },
        cardBgImage() {
            return {
                backgroundImage: `url(${this.dataImage})`
            };
        },
        dataImage() {
            return this.board.background
        },
        title(){
          return this.board.title
        },
        tasksInLists(){
          const {taskLists,tasks}=this.board
          if(!tasks) return `Without tasks.`;
          if(tasks===1 && taskLists===1) return `One task in One List.`;
          if(taskLists===1) return `${tasks} tasks in one List.`;
          return `${tasks} tasks in ${taskLists} Lists.`;
        }
    },
    methods: {
        handleMouseMove(e) {
            this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
            this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
        },
        handleMouseEnter() {
            clearTimeout(this.mouseLeaveDelay);
        },
        handleMouseLeave() {
            this.mouseLeaveDelay = setTimeout(() => {
                this.mouseX = 0;
                this.mouseY = 0;
            }, 1000);
        }
    }
};
</script>
