<template>
  <div>
         <h1>Login now</h1>
  <div class="job-container">
   <h1>{{ msg }}</h1>
  </div>

    </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      msg: 'Hello Adonis and Vue',
    };
  },
};
</script>