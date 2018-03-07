<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <h2>Cadastrar</h2>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="estabelecimento"
                label="Estabelecimento"
                id="estabelecimento"
                required
                v-model="estabelecimento"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="endereco"
                label="Endereco"
                id="endereco"
                required
                v-model="endereco"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-btn to="/camera">
            <v-icon>camera</v-icon>
          </v-btn>
          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <div class="title">Adicionar prato</div>
              <v-btn
                color="primary"
                id="addFields"
                @click="addFields()"
                fab
                small
              ><v-icon>add</v-icon></v-btn>
              <v-flex v-for="(row, index) of pratos" :key="index">
                <v-text-field label="Nome" name="row.nome" v-model="row.nome"></v-text-field>
                <v-text-field label="Breve descrição" name="row.descricao" v-model="row.descricao"></v-text-field>
                <v-text-field label="Preço" name="row.preco" v-model="row.preco"></v-text-field>
                <v-divider></v-divider>
              </v-flex>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn 
                class="primary" 
                :disabled="!formIsValid"
                type="submit"
                >Cadastrar</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      estabelecimento: '',
      endereco: '',
      pratos: []
    }
  },
  computed: {
    formIsValid () {
      return this.estabelecimento !== '' &&
        this.endereco !== ''
    }
  },
  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      const restauranteData = {
        estabelecimento: this.estabelecimento,
        endereco: this.endereco,
        pratos: this.pratos
      }
      this.$store.dispatch('createRestaurante', restauranteData)
      this.$router.push('/home')
    },
    addFields () {
      this.pratos.push({nome: '', descricao: '', preco: ''})
    }
  }
}
</script>

