import Vue from 'vue';
import moment from 'moment'

Vue.filter('short-name', (name) => {
    const nameArr = name.split(' ')
    let short = nameArr.map(word => word.charAt(0)).join('')
    if (short.length > 2) short = short[0] + short[1]
    return short
})
Vue.filter('date', (timestamp) => {
    return moment(new Date(timestamp)).fromNow();
})
Vue.filter('due-date', (timestamp) => {
    return moment(new Date(timestamp)).format("MMM Do YY");

})