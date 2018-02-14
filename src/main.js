// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueTimepicker from 'vue2-timepicker'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import * as VueGoogleMaps from 'vue2-google-maps'
import * as helper from './helpers';
const helpers = helper.helpers;

// Vue.use(VueAxios, axios)
// Vue2 Google Maps https://www.npmjs.com/package/vue2-google-maps
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDpbFS43PcKdhQEIE_5wkVitHPr9y6MUnc',
    libraries: 'places',
  }
})

// API url
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
  window.api = 'http://localhost:8080';
} else {
  // Online api
}





// Global Methods
Vue.prototype.$post = helpers.post
Vue.prototype.$get = helpers.get
Vue.prototype.$deleteBulk = helpers.deleteBulk
Vue.prototype.$copy = helpers.copy
Vue.prototype.$makeID = helpers.makeID
Vue.prototype.$initTable = helpers.initTable


// Global Filters
Vue.filter('userType', helpers.userType);
Vue.filter('formatDate', helpers.formatDate);

// Timer picker
// Vue.use(VueTimepicker)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
