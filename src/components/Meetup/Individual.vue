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
              <v-list-tile v-bind:key="prato.id">
                <v-list-tile-content>
                  <v-list-tile-title>{{ prato.nome }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ prato.descricao }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>R$ {{ prato.preco }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-flex xs1>
                  <v-text-field
                    type="number"
                    placeholder="1"
                    name="quantidade"
                    v-model="prato.quantidade"
                  ></v-text-field>
                </v-flex>
                <v-list-tile-action @click="toggle(prato)">
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
    </v-layout>
    <v-layout row>
      <v-flex
        xs12
        sm6
        offset-sm3
        class="mt-4"
      >
        <v-btn
          block
          class="green"
          :disabled="!formIsValid"
          @click="onCreatePedido()"
          ><v-icon>done</v-icon></v-btn>
      </v-flex>
    </v-layout>
    {{ this.selected[0] }}
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      selected: []
    }
  },
  computed: {
    formIsValid () {
      return this.selected.length > 0
    },
    item () {
      return this.$store.getters.restaurante(this.id)
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onCreatePedido () {
      this.$store.pedidoParaPagamento = this.selected
      this.$store.restauranteDoPedido = this.item.endereco
      this.$router.push('/pagamento')
    },
    toggle (prato) {
      if (prato.quantidade === '' || Object.values(prato.quantidade) === '' || prato.quantidade === '0') {
        return
      }
      const i = this.selected.indexOf(prato)
      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(prato)
      }
    }
  }
}
</script>
