import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: [],
    pedidos: []
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    createPedido (state, payload) {
      state.pedidos.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.estabelecimento) {
        meetup.estabelecimento = payload.estabelecimento
      }
      if (payload.endereco) {
        meetup.endereco = payload.endereco
      }
      if (payload.pratos) {
        meetup.pratos = payload.pratos
      }
    }
  },
  // is in the 'actions' where we made ascyncronus tasks
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then(data => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              endereco: obj[key].endereco,
              estabelecimento: obj[key].estabelecimento,
              imageUrl: obj[key].imageUrl,
              pratos: obj[key].pratos,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.location) {
        updateObj.location = payload.location
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        estabelecimento: payload.estabelecimento,
        endereco: payload.endereco,
        pratos: payload.pratos
      }
      firebase.database().ref('meetups').push(meetup)
        .then(data => {
          console.log(data)
          const key = data.key
          commit('createMeetup', {...meetup, id: key})
        })
        .catch(error => console.log(error))
      // Reach out to firebase
    },
    createPedido ({commit, getters}, payload) {
      const pedido = {
        nome: payload.nome,
        celular: payload.celular,
        endereco: payload.endereco,
        numero: payload.numero,
        pagamento: payload.pagamento
      }
      firebase.database().ref('pedidos').push(pedido)
        .then(data => {
          console.log(data)
          const key = data.key
          commit('createPedido', {...pedido, id: key})
        })
        .catch(error => console.log(error))
      // Reach out to firebase
    },
    registeredMeetups ({commit, getters}, payload) {
      return getters.loadedMeetups.find(meetup => {
        return meetup === payload.id
      })
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 3)
    }
  }
}
