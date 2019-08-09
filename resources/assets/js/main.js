import Vue from 'vue'
import router from './router'
import App from '@/components/layout/App'

import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)


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