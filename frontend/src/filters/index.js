import Vue from 'vue';
Vue.filter('short-name', (name) => {
    const nameArr = name.split(' ')
    let short = nameArr.map(word => word.charAt(0)).join('')
    if (short.length > 2) short = short[0] + short[1]
    return short
})