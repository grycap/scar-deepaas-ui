import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import cognitoAuth from './cognito'
// import VueRouter from 'vue-router'
import router from './router/index'
import env from './env.js'
import AWS from 'aws-sdk'

window.axios = require('axios')

Vue.mixin({
  data: function(){
    return {      
      env:env,      
    }
  }
})
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  cognitoAuth,
  AWS,
  render: h => h(App)
}).$mount('#app')
