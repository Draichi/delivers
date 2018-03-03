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
              <v-card>
                <v-list three-line>
                  <template v-for="(item, index) in loadedPedidos">
                    <v-list-tile v-bind:key="item.id" @click="toggle(index)">
                      <v-list-tile-content>
                        <v-list-tile-title>Endereço: {{ item.endereco }} - {{ item.numero }}</v-list-tile-title>
                        <v-list-tile-sub-title>Celular: {{ item.celular }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title>Nome: {{ item.nome }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title v-for="prato in item.prato" :key="prato.nome">{{ prato.nome }}</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-list-tile-action-text v-if="item.pagamento === 0">
                          Cartão de crédito
                        </v-list-tile-action-text>
                        <v-list-tile-action-text v-if="item.pagamento === 1">
                          Cartão de débito
                        </v-list-tile-action-text>
                        <v-list-tile-action-text v-if="item.pagamento === 2">
                          Dinheiro
                        </v-list-tile-action-text>
                        <v-icon
                          color="grey lighten-1"
                          v-if="selected.indexOf(index) < 0"
                        >star_border</v-icon>
                        <v-icon
                          color="yellow darken-2"
                          v-else
                        >star</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
                    <v-divider v-if="index + 1 < loadedPedidos.length" :key="index"></v-divider>
                  </template>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    flex: [12, 6, 6] * 5,
    selected: [0]
  }),
  computed: {
    loadedPedidos () {
      return this.$store.getters.pedidos
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
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