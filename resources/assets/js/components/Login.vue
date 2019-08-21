<template>
  <div class="text-center">
      <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

      <b-form @submit.prevent="login" @reset="onReset" v-if="show" class="form-signin">

      <!-- <input type="hidden" name="_csrf" value="{{ csrfToken }}" v-model="_csrf"> -->

      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        label-class="sr-only"
        description=""
      >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

       <b-form-group
        id="input-group-2"
        label="Password:"
        label-for="input-2"
        label-class="sr-only"
        description=""
      >
        <b-form-input
          id="input-2"
          v-model="password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3">
        <b-form-checkbox-group v-model="remember" id="checkboxes-4">
          <b-form-checkbox value="true">Remember me</b-form-checkbox>     
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary" class="btn btn-lg btn-primary btn-block">Sign in</b-button>
      </b-form>
      
      <div class="ui divider"></div>

      <div class="ui column grid">
        <div class="center aligned column">
          <p>
            Don't have an account? <router-link to="/signup">Sign Up</router-link>
          </p>
        </div>
      </div>

      <p class="mt-5 mb-3 text-muted" v-if="new Date().getFullYear() > 2019">&copy; 2019-{{ new Date().getFullYear() }}</p>
      <p class="mt-5 mb-3 text-muted" v-else>&copy; 2019</p>
  </div>
</template>

<script>
import cookies from 'browser-cookies';
const axios = require('axios');

export default {
  name: "Login",
  components: {
            Notification
        },
  data() {
    return {
     
          email: '',
          password: '',      
          remember: false,
          notification: {
                    message: '',
                    type: ''
                },
        show: true
    };
  },
  methods: {
    async login () {
      console.log("login");
      const csrf = cookies.get('XSRF-TOKEN')

      // axios.post(
      //   '/login', 
      // {
      //   email: this.email,
      //   password: this.password,
      //   remember: this.remember,
      //   // _csrf : csrf
      // },
      // // {
      // //   headers: {
      // //   'Accept': 'application/json',
      // //   'Content-Type': 'application/json',
      // //   // 'x-xsrf-token': csrf,
      // // }
      // // }
      // )
      // .then((res) => {
      //   console.log(`statusCode: ${res.statusCode}`)
      //   console.log(res)
      // })
      // .catch((error) => {
      //   console.error(error)
      // });

      // const response = await fetch('/login', {
      //     method: 'post',
      //     headers: {
      //         'Accept': 'application/json',
      //         'Content-Type': 'application/json',
      //         'x-xsrf-token': csrf,
      //     },
      // });

      // const body = await response.json()

      //console.log(body)

                axios
                    .post('/login', {
                        email: this.email,
                        password: this.password,
                        remember: this.remember,
                    })
                    .then(response => {
                      console.log(response);
                        // save token in localstorage
                        //localStorage.setItem('tweetr-token', response.data.data.token)

                        // redirect to user home
                        this.$router.push('/')
                    })
                    .catch(error => {

                        console.log(error.response);
                        // clear form inputs
                        this.email = this.password = this.remember = ''
                        // display error notification
                        // this.notification = Object.assign({}, this.notification, {
                        //     message: error.response.data.message,
                        //     type: error.response.data.status
                        // })

                        this.$notify({
                          group: 'app',
                          type: 'error',
                          title: error.response.data.status.toUpperCase(),
                          text: error.response.data.message
                        });
                    })
            },
      
      onSubmit(evt) {
        console.log("onSubmit");
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        console.log("onReset");
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
        this.form.remember = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
};
</script>