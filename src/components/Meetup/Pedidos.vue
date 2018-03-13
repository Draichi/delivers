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
    <v-layout column v-if="!loading">
      <v-flex xs12>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex 
              xs12
              sm6
              offset-sm3
            >
              <v-card v-for="(item, index) in loadedPedidos" :key="item.id">
                <v-card-media>
                  <google-map
                    name="example"
                    :origem="item.endereco"
                  ></google-map>
                </v-card-media>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{ item.endereco }} - {{ item.numero }}</div>
                    <div
                      v-for="prato in item.prato"
                      :key="prato.nome"
                    >
                      {{ prato.nome }} - {{ prato.preco }}
                    </div>
                    <div v-if="item.pagamento === 0" >Cartão de crédito <v-icon>credit_card</v-icon></div>
                    <div v-if="item.pagamento === 1" >Cartão de débito <v-icon>credit_card</v-icon></div>
                    <div v-if="item.pagamento === 2" >Dinheiro <v-icon>account_balance_wallet</v-icon></div>
                  </div>
                </v-card-title>
                <v-card-text>
                  {{ item.nome }} - {{ item.celular }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="purple">excluir</v-btn>
                </v-card-actions>
                <v-divider v-if="index + 1 < loadedPedidos.length" :key="index"></v-divider>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import GoogleMap from '@/components/Meetup/GoogleMap'
export default {
  components: {
    'google-map': GoogleMap
  },
  data: () => ({
    show: false
  }),
  computed: {
    loadedPedidos () {
      return this.$store.getters.pedidos
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>