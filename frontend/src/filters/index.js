import Vue from 'vue';
Vue.filter('short-name', (name) => {
    const nameArr = name.split(' ')
    return nameArr.map(word => word.charAt(0)).join('')
})