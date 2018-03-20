// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import Alert from './components/Shared/Alert.vue'
import EditMeetupModal from './components/Meetup/Edit/EditMeetupModal.vue'
import RegisterModal from './components/Meetup/Register/RegisterModal.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('app-alert', Alert)
Vue.component('edit-modal', EditMeetupModal)
Vue.component('register-modal', RegisterModal)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDfayf_Jn_dOCg73n7vycSoWafMJNmnWS8',
      authDomain: 'officemall-ea976.firebaseapp.com',
      databaseURL: 'https://officemall-ea976.firebaseio.com',
      projectId: 'officemall-ea976',
      storageBucket: 'gs://officemall-ea976.appspot.com',
      messagingSenderId: '617902006301'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadRestaurantes')
    this.$store.dispatch('loadPedidos')
  }
})
