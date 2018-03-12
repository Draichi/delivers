import Vue from 'vue'
import Vuex from 'vuex'
import restaurantes from './restaurantes'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    restaurantes: restaurantes,
    user: user,
    shared: shared
  }
})
