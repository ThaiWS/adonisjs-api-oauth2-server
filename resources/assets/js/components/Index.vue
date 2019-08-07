<template>
  <div>
    <h2>Index</h2>
    <router-link to="/about">To About page</router-link>
    <router-link to="/login">To login page</router-link>
    <b-alert show>Default Alert</b-alert>

    <b-alert variant="success" show>Success Alert</b-alert>

    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>Dismissible Alert!</b-alert>

    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="warning"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>
      <b-progress variant="warning" :max="dismissSecs" :value="dismissCountDown" height="4px"></b-progress>
    </b-alert>

    <b-button @click="showAlert" variant="info" class="m-1">Show alert with count-down timer</b-button>
    <b-button
      @click="showDismissibleAlert=true"
      variant="info"
      class="m-1"
    >Show dismissible alert ({{ showDismissibleAlert ? 'visible' : 'hidden' }})</b-button>

    <b-card
      title="Card Title"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>Some quick example text to build on the card title and make up the bulk of the card's content.</b-card-text>

      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>

    <div class="text-center my-3">
  <b-button v-b-tooltip.hover title="Tooltip content">Hover Me</b-button>
</div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>