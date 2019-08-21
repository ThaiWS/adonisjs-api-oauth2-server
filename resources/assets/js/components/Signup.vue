<template>
  <div class="text-center">
      <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Join now</h1>

      <b-form @submit.prevent="signup" @reset="onReset" v-if="show" class="form-signup">
      <b-form-group
        id="input-group-1"
        label="username:"
        label-for="input-1"
        label-class="sr-only"
        description=""
      >
        <b-form-input
          id="input-1"
          v-model="username"
          type="text"
          required
          placeholder="Enter username"
        ></b-form-input>
      </b-form-group>

       <b-form-group
        id="input-group-2"
        label="email:"
        label-for="input-2"
        label-class="sr-only"
        description=""
      >
        <b-form-input
          id="input-2"
          v-model="email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

       <b-form-group
        id="input-group-2"
        label="password:"
        label-for="input-3"
        label-class="sr-only"
        description=""
      >
        <b-form-input
          id="input-3"
          v-model="password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>


      <b-button type="submit" variant="primary" class="btn btn-lg btn-primary btn-block">Sign in</b-button>
      </b-form>
      
      <p class="mt-5 mb-3 text-muted" v-if="new Date().getFullYear() > 2019">&copy; 2019-{{ new Date().getFullYear() }}</p>
      <p class="mt-5 mb-3 text-muted" v-else>&copy; 2019</p>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: "Signup",
  data() {
    return {     
          username: '',
          email: '',
          password: '',     
          show: true
    };
  },
  methods: {
    signup () {
                axios
                    .post('/signup', {
                        email: this.email,
                        username: this.username,
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
                        this.email = this.password = this.username = ''
                        // display error notification
                        this.$notify({
                          group: 'app',
                          type: 'error',
                          title: error.response.data.status.toUpperCase(),
                          text: error.response.data.message
                        });
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
        this.form.username = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
};
</script>