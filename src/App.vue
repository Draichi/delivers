<template>
  <v-app>
    <v-navigation-drawer
      fixed
      app
      v-model="sideNav"
      :mini-variant="true"
    >
      <v-list v-for="item in menuItems" :key="item.title">
        <v-list-tile :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list v-if="userAuthenticaded">
        <v-list-tile @click="onLogOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="light-blue" dark>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link
          to="/home"
          tag="span"
          style="cursor: pointer"
        >
          {{ this.$route.name }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          v-if="!userAuthenticaded"
          :to="item.link"
          flat
          v-for="item in menuItems"
          :key="item.title"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat v-if="userAuthenticaded" @click="onLogOut">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view>
        <v-container fluid></v-container>
      </router-view>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          // { icon: 'face', title: 'Sign up', link: '/signup' },
          { icon: 'lock_open', title: 'Sign in', link: '/signin' }
        ]
        if (this.userAuthenticaded) {
          menuItems = [
            { icon: 'favorite', title: 'Pedidos', link: '/pedidos' },
            { icon: 'dashboard', title: 'About', link: '/home' },
            { icon: 'place', title: 'Cadastrar', link: '/parceiro/novo' }
          ]
        }
        return menuItems
      },
      userAuthenticaded () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogOut () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
