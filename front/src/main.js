import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
require('./plugins/fontawesome');
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import moment from 'moment';
import 'vuetify/dist/vuetify.min.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import JsonExcel from "vue-json-excel";
import VueResource from "vue-resource"

import 'bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false
Vue.use(VueToast);
Vue.use(VueSweetalert2);
Vue.use(VueResource);
Vue.component("downloadExcel", JsonExcel);
new Vue({
  router,
  vuetify,
  moment,
  render: h => h(App),
}).$mount('#app')
