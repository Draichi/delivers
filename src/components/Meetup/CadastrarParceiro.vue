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
          <v-layout row wrap>
            <v-flex xs12 sm2 offset-sm3>
              <v-icon>access_alarm</v-icon>
              <v-text-field
                name="horarioAbertura"
                label="Hórario de abertura"
                type="time"
                suffix="00:00 ~ 23:59"
                id="horarioAbertura"
                v-model="horarioAbertura"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm2 offset-sm2>
              <v-icon>snooze</v-icon>
              <v-text-field
                name="horarioFechamneto"
                label="Hórario de fechamento"
                type="time"
                suffix="00:00 ~ 23:59"
                id="horarioFechamento"
                v-model="horarioFechamento"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="text-xs-center">
              <input
                type="file"
                style="display: none"
                @change="onFilePicked"
                ref="fileInput"
                accept="image/*"
              >
              <v-btn
                fab
                dark
                @click="onPickFile"
              >
                <v-icon>local_see</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex
              class="text-xs-center"
              xs12
              sm6
              offset-sm3
              v-if="this.imageUrl !== ''"
            >
              <img :src="imageUrl" height="150" alt="logo">
            </v-flex>
          </v-layout>
          <!-- file hehere -->
          <!-- file hehere -->
          <!-- file hehere -->
          <!-- file hehere -->
          <v-layout row class="mt-5">
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
      horarioAbertura: '',
      horarioFechamento: '',
      pratos: [],
      image: null,
      imageUrl: ''
    }
  },
  computed: {
    formIsValid () {
      return this.estabelecimento !== '' &&
        this.endereco !== '' &&
        this.horarioAbertura !== '' &&
        this.horarioFechamento !== '' &&
        this.pratos !== [] &&
        this.imageUrl !== ''
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
        horarioAbertura: this.horarioAbertura,
        horarioFechamento: this.horarioFechamento,
        pratos: this.pratos,
        imageUrl: this.imageUrl
      }
      this.$store.dispatch('createRestaurante', restauranteData)
      this.$router.push('/home')
    },
    addFields () {
      this.pratos.push({nome: '', descricao: '', preco: ''})
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const file = event.target.files[0]
      const fileName = file.name
      // smaller or equal to zero means it doesn't have an extension
      if (fileName.lastIndexOf('.') <= 0) {
        return alert('Por favor selecionar uma imagem válida.')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>

