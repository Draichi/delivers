<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <p class="display-1 text-xs-center">Restaurante</p>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-icon>store_mall_directory</v-icon>
              <v-text-field
                name="estabelecimento"
                label="Ex: Pizzaria Nova Horizonte "
                id="estabelecimento"
                v-model="estabelecimento"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-icon>place</v-icon>
              <v-text-field
                name="endereco"
                label="Ex: Rua Salomão, 455"
                id="endereco"
                v-model="endereco"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-icon>access_time</v-icon>
              <v-text-field
                name="horario"
                label="Ex: 11:00 - 16:00"
                type="time"
                suffix="00:00 ~ 23:59"
                id="horario"
                v-model="horario"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-5">
            <v-flex xs12 sm6 offset-sm3 class="text-xs-center">
              <v-btn fab dark>
                <v-icon>local_see</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <!-- file hehere -->
          <!-- file hehere -->
          <!-- file hehere -->
          <!-- file hehere -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <p class="display-1 text-xs-center">Cardápio</p>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
              <v-layout column>
                <v-flex
                v-for="(row, index) of pratos"
                :key="index"
                class="py-3"
                >
                  <p class="text-xs-center title">n° {{ (index + 1) }}</p>
                  <v-text-field
                    label="Nome"
                    name="row.nome"
                    v-model="row.nome"
                  ></v-text-field>
                  <v-text-field
                    label="Breve descrição"
                    name="row.descricao"
                    v-model="row.descricao"
                  ></v-text-field>
                  <v-text-field
                    label="Preço"
                    name="row.preco"
                    v-model="row.preco"
                    prefix="$"
                    value="10,00"
                  ></v-text-field>
                  <v-divider></v-divider>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <div class="text-xs-center">
                <v-btn
                  fab
                  dark
                  id="addFields"
                  color="pink"
                  @click="addFields()"
                >
                  <v-icon dark>restaurant</v-icon>
                </v-btn>
              </div>
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
      horario: '',
      pratos: [],
      image: null
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
        pratos: this.pratos,
        image: this.$store.foto
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

