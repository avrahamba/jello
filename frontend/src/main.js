/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './styles/global.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import VModal from 'vue-js-modal';
Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: false } })
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import './filters';
import TextareaAutosize from 'vue-textarea-autosize'

Vue.use(ElementUI, { locale })
Vue.use(TextareaAutosize)




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

