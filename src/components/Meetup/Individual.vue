<template>
  <v-container>
    <v-layout row v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular 
          indeterminate 
          class="primary--text"
          :width="10"
          :height="100"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-list three-line>
            <template v-for="(prato, index) in item.pratos">
              <v-list-tile v-bind:key="prato.id" @click="toggle(prato)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ prato.nome }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ prato.descricao }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>R${{ prato.preco }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon
                    color="grey lighten-1"
                    v-if="!selected.includes(prato)"
                  >add</v-icon>
                  <v-icon
                    color="yellow darken-2"
                    v-else
                  >done</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < item.pratos.length" :key="index"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 class="pt-3">
        <v-card>
          <v-card-title>
            <div class="subheading">Como deseja pagar?</div>
          </v-card-title>
          <v-card-actions>
            <v-btn-toggle v-model="toggle_pagamento">
              <v-btn small>
                Crédito
                <v-icon>credit_card</v-icon>
              </v-btn>
              <v-btn small>
                Débito
                <v-icon>credit_card</v-icon>
              </v-btn>
              <v-btn small>
                Dinheiro
                <v-icon>account_balance_wallet</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-card-actions>
          <v-card-title>
            <div class="subheading">Preencha seus dados</div>
          </v-card-title>
          <v-card-actions>
            <v-form 
              v-model="valid"
              class="px-2"
              @submit.prevent="onCreatePedido"
            >
              <v-text-field
                label="Seu nome"
                v-model="nome"
                required
              ></v-text-field>
              <v-text-field
                label="Seu celular"
                v-model="celular"
                required
              ></v-text-field>
              <v-text-field
                label="Rua"
                v-model="endereco"
                required
              ></v-text-field>
              <v-text-field
                label="Numero"
                v-model="numero"
                required
              ></v-text-field>
              <v-btn
                block
                color="teal"
                dark
                type="submit"
              >REALIZAR PEDIDO</v-btn>
            </v-form>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      toggle_pagamento: null,
      selected: [],
      valid: false,
      nome: '',
      celular: '',
      endereco: '',
      numero: ''
    }
  },
  computed: {
    formIsValid () {
      return this.endereco !== '' &&
        this.numero !== ''
    },
    item () {
      return this.$store.getters.restaurantes(this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsTheCreator () {
      if (!this.userIsAuthenticated) {
        return false
      } else {
        return this.$store.getters.user.id === this.meetup.creatorId
      }
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onCreatePedido () {
      if (!this.formIsValid) {
        return
      }
      const pedidoData = {
        nome: this.nome,
        celular: this.celular,
        endereco: this.endereco,
        numero: this.numero,
        // 0 credito / 1 debito / 2 dinheiro
        pagamento: this.toggle_pagamento,
        prato: this.selected
      }
      this.$store.dispatch('createPedido', pedidoData)
      this.$router.push('/home')
    },
    toggle (index) {
      const i = this.selected.indexOf(index)
      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(index)
      }
    }
  }
}
</script>
