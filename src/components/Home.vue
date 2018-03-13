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
    <v-layout row v-if="!loading">
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-list three-line>
            <template v-for="(item, index) in restaurantes">
              <v-list-tile v-bind:key="index" @click="onLoadRestaurante(item.id)">
                <v-list-tile-avatar>
                  <img :src="item.imageUrl" alt="logo">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.estabelecimento }}</v-list-tile-title>
                  <v-list-tile-sub-title>
                    <v-icon color="yellow darken-2">
                      star
                      star
                      star
                      star
                      star_half
                    </v-icon>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>{{ item.endereco }}</v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < restaurantes.length" :key="index"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    flex: [12, 6, 6] * 5
  }),
  computed: {
    restaurantes () {
      return this.$store.getters.restaurantes
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadRestaurante (id) {
      this.$router.push('/restaurantes/' + id)
    }
  }
}
</script>