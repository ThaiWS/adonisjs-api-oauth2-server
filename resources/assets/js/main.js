import Vue from 'vue'
import router from './router'
import App from '@/components/layout/App'

import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Notifications)
// import VueNotify from 'vue-notifyjs'
// import 'vue-notifyjs/themes/default.css'
// Vue.use(VueNotify)


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


// import cookies from 'browser-cookies';
// (async () => {
//     const csrf = cookies.get('XSRF-TOKEN')
//     const response = await fetch('/api/post-example', {
//         method: 'post',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'x-xsrf-token': csrf,
//         },
//     });

//     const body = await response.json()

//     console.log(body)
    
// })()