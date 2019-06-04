<template>
  <v-container class="ma-5">
    <h1>Cadastro de produto</h1>
    <v-flex xs12 sm6 md3>
      <v-text-field label="Descrição" v-model="descricao" :rules="regrasDescricao" required></v-text-field>
    </v-flex>
    <v-flex xs12 sm6 md3>
      <v-text-field label="Fabricante" v-model="fabricante" :rules="regrasFabricante" required></v-text-field>
    </v-flex>
    <v-btn class="green" @click="submit">Cadastrar</v-btn>
    <v-btn class="blue">Limpar</v-btn>
    <v-btn href="/" class="red">Voltar</v-btn>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      descricao: "",
      regrasDescricao: [
            (v) => !!v || 'Descrição é Obrigatório',
            (v) => v.length >= 10 || 'Descrição deve ter pelo menos 10 caracteres'
        ],
      fabricante: "",
      regrasFabricante: [
            (v) => !!v || 'Fabricante é obrigatótio',
            (v) => v.length >= 2 || 'Fabricante deve ter pelo menos 2 caracteres'
        ]
    };
  },
  methods: {
    submit() {
    let data = {
        "descricao": this.descricao,
        "fabricante":this.fabricante
    };
    data = JSON.stringify( data );
    fetch( "http://localhost:3000/api/produtos/", {
          headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json'
          },
          method: "POST",
          body: data
      } );
      console.log( data );
    }
  }
};
</script>