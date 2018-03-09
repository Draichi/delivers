<template>
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
    {{ this.$store.pedidoParaPagamento }}
  </v-flex>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      toggle_pagamento: null,
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
    }
  }
}
</script>

