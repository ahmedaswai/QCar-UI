// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
// API
window.api = 'http://52.232.114.239:8080';


// Axios Globals
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
// console.log(axios.defaults.headers);
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.interceptors.request.use(function (config) {
//     console.log(config);
//     return config;
//     }, function (error) {
//     console.log(error);
//     return Promise.reject(error);
// });


// Global Methods
Vue.prototype.$post = function(url, data, headers){
    const self = this;
    if(!headers) {
        headers = {
            "Content-Type": "application/json;charset=utf-8",
            "q-car-auth": localStorage.getItem('Q_Car__user_token')
        };
        console.log(localStorage.getItem('Q_Car__user_token'));
    }

    return fetch(`${api}${url}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: headers,
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if(data.sc === 401){
            console.log('401, WTF!!!');
            // return self.$router.push('/')
        }
        return data;
    });
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
