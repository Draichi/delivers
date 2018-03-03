import * as firebase from 'firebase'

export default {
  state: {
    restaurantes: [],
    pedidos: []
  },
  mutations: {
    setRestaurantes (state, payload) {
      state.restaurantes = payload
    },
    setPedidos (state, payload) {
      state.pedidos = payload
    },
    createRestaurantes (state, payload) {
      state.restaurantes.push(payload)
    },
    createPedido (state, payload) {
      state.pedidos.push(payload)
    },
    updateRestaurantes (state, payload) {
      const restaurante = state.restaurantes.find(restaurante => {
        return restaurante.id === payload.id
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
    loadRestaurantes ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('restaurantes').once('value')
        .then(data => {
          const restaurantes = []
          const obj = data.val()
          for (let key in obj) {
            restaurantes.push({
              id: key,
              endereco: obj[key].endereco,
              estabelecimento: obj[key].estabelecimento,
              imageUrl: obj[key].imageUrl,
              pratos: obj[key].pratos,
              creatorId: obj[key].creatorId
            })
          }
          commit('setRestaurantes', restaurantes)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    loadPedidos ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('pedidos').once('value')
        .then(data => {
          const pedidos = []
          const obj = data.val()
          for (let key in obj) {
            pedidos.push({
              id: key,
              celular: obj[key].celular,
              endereco: obj[key].endereco,
              nome: obj[key].nome,
              numero: obj[key].numero,
              pagamento: obj[key].pagamento,
              prato: obj[key].prato
            })
          }
          commit('setPedidos', pedidos)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    updateRestauranteData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.endereco) {
        updateObj.endereco = payload.endereco
      }
      if (payload.estabelecimento) {
        updateObj.estabelecimento = payload.estabelecimento
      }
      if (payload.imageUrl) {
        updateObj.imageUrl = payload.imageUrl
      }
      if (payload.pratos) {
        updateObj.pratos = payload.pratos
      }
      firebase.database().ref('restaurantes').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateRestaurantes', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createRestaurantes ({commit, getters}, payload) {
      const restaurante = {
        estabelecimento: payload.estabelecimento,
        endereco: payload.endereco,
        pratos: payload.pratos
      }
      firebase.database().ref('restaurantes').push(restaurante)
        .then(data => {
          console.log(data)
          const key = data.key
          commit('createRestaurantes', {...restaurante, id: key})
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
        pagamento: payload.pagamento,
        prato: payload.prato
      }
      firebase.database().ref('pedidos').push(pedido)
        .then(data => {
          console.log(data)
          const key = data.key
          commit('createPedido', {...pedido, id: key})
        })
        .catch(error => console.log(error))
      // Reach out to firebase
    }
    // registeredMeetups ({commit, getters}, payload) {
    //   return getters.loadedMeetups.find(meetup => {
    //     return meetup === payload.id
    //   })
    // }
  },
  getters: {
    restaurantes (state) {
      return state.restaurantes.sort((restauranteA, restauranteB) => {
        return restauranteA.date > restauranteB.date
      })
    },
    pedidos (state) {
      return state.pedidos.sort((pedidoA, pedidoB) => {
        return pedidoA.date > pedidoB.date
      })
    },
    pedido (state) {
      return (pedidoID) => {
        return state.pedidos.find((pedido) => {
          return pedido.id === pedidoID
        })
      }
    }
  }
}
