import * as firebase from 'firebase'

export default {
  state: {
    restaurantes: [],
    pedidos: [],
    pedidoParaPagamento: {}
  },
  mutations: {
    setRestaurante (state, payload) {
      state.restaurantes = payload
    },
    setPedido (state, payload) {
      state.pedidos = payload
    },
    createRestaurante (state, payload) {
      state.restaurantes.push(payload)
    },
    createPedido (state, payload) {
      state.pedidos.push(payload)
    },
    updateRestaurante (state, payload) {
      const restaurante = state.restaurantes.find(restaurante => {
        return restaurante.id === payload.id
      })
      if (payload.estabelecimento) {
        restaurante.estabelecimento = payload.estabelecimento
      }
      if (payload.endereco) {
        restaurante.endereco = payload.endereco
      }
      if (payload.pratos) {
        restaurante.pratos = payload.pratos
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
          commit('setRestaurante', restaurantes)
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
          commit('setPedido', pedidos)
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
          commit('updateRestaurante', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createRestaurante ({commit, getters}, payload) {
      const restaurante = {
        estabelecimento: payload.estabelecimento,
        endereco: payload.endereco,
        pratos: payload.pratos,
        image: payload.image
      }
      let imageUrl
      let key
      firebase.database().ref('restaurantes').push(restaurante)
        .then(data => {
          console.log(data)
          key = data.key
          return key
        })
        .then(key => {
          return firebase.storage().ref('images/').child(key).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('restaurantes').child(key).update({imageUrl: imageUrl})
        })
        // commit to local store
        .then(() => {
          commit('createRestaurante', {
            ...restaurante,
            imageUrl: imageUrl,
            id: key
          })
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
    restaurante (state) {
      return (restauranteID) => {
        return state.restaurantes.find(restaurante => {
          return restaurante.id === restauranteID
        })
      }
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
