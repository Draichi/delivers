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
                  <template v-for="item in loadedPedidos">
                    {{ item }}
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
    flex: [12, 6, 6] * 5
  }),
  computed: {
    loadedPedidos () {
      return this.$store.getters.loadedPedidos
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>