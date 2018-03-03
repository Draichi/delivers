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
                  <template v-for="(item, index) in meetups">
                    <v-list-tile v-bind:key="index" @click="onLoadMeetup(item.id)">
                      <v-list-tile-avatar>
                        <img :src="item.imageUrl" alt="">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ item.estabelecimento }}</v-list-tile-title>
                        <v-list-tile-sub-title>
                          <v-icon>
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
                    <v-divider v-if="index + 1 < meetups.length" :key="index"></v-divider>
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
    meetups () {
      return this.$store.getters.restaurantes
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>