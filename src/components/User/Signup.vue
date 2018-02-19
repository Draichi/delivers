<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignUp">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="mail"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                    <v-text-field
                      name="endereco"
                      label="Endereço"
                      id="endereco"
                      v-model="endereco"
                      type="endereco"
                      required
                    ></v-text-field>
                    <v-text-field
                      name="numero"
                      label="Número"
                      id="numero"
                      v-model="numero"
                      type="numero"
                      required
                    ></v-text-field>
                    <v-text-field
                      name="password"
                      label="Senha"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    > </v-text-field>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirma Senha"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                    ></v-text-field>
                    <v-radio-group v-model="radioGroup">
                      <v-radio
                        label="Cliente"
                        value="cliente"
                      ></v-radio>
                      <v-radio
                        label="Fornecedor"
                        value="fornecedor"
                      ></v-radio>
                    </v-radio-group>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn 
                      type="submit"
                      :loading="loading"
                      :disabled="loading"
                    >Cadastrar
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      numero: '',
      endereco: '',
      password: '',
      confirmPassword: '',
      radioGroup: 1
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Password do not match' : ''
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignUp () {
      this.$store.dispatch('UserSignUp', {
        email: this.email,
        password: this.password,
        numero: this.numero,
        endereco: this.endereco
      })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
