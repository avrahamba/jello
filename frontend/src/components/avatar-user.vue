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
};
</script>

<style>
.txt {
display: block;
font-size: 12px;
font-weight: 700;
height: 32px;
left: 0;
line-height: 32px;
overflow: hidden;
position: absolute;
text-align: center;
top: 0;
height: 28px;
line-height: 28px;
width: 28px;

}
.avatar-user {
    background-color: #dfe1e6;
border-radius: 25em;
color: #172b4d;
cursor: pointer;
display: block;
float: left;
height: 32px;
margin: 0 4px 4px 0;
overflow: visible;
position: relative;
width: 32px;
text-decoration: none;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
z-index: 0;
  height: 28px;
  width: 28px;
  margin: 0 0 4px 4px;
}
</style>
