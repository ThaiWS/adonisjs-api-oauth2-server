<template>
  <div class="text-center">
      <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <Notification
            :message="notification.message"
            :type="notification.type"
            v-if="notification.message"
          />
      <b-form @submit.prevent="user.login" @reset="onReset" v-if="show" class="form-signin">
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
export default {
  name: "Signup",
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
    login () {
                axios
                    .post('/user/login', {
                        email: this.email,
                        password: this.password,
                        password: this.password,
                    })
                    .then(response => {
                        // save token in localstorage
                        //localStorage.setItem('tweetr-token', response.data.data.token)

                        // redirect to user home
                        this.$router.push('/')
                    })
                    .catch(error => {
                        // clear form inputs
                        this.email = this.password = ''
                        // display error notification
                        this.notification = Object.assign({}, this.notification, {
                            message: error.response.data.message,
                            type: error.response.data.status
                        })
                    })
            },
      
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
};
</script>