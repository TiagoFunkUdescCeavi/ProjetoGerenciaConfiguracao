<template>
  <v-container class="ma-1">
    <h1>Cadastro de produto</h1>
    <v-flex xs12 sm6 md2>
      <v-text-field label="Descrição" v-model="descricao" :rules="regrasDescricao" required></v-text-field>
    </v-flex>
    <v-flex xs12 sm6 md2>
      <v-text-field label="Fabricante" v-model="fabricante" :rules="regrasFabricante" required></v-text-field>
    </v-flex>
    <v-layout align-center>
        <v-btn dark @click="submit">
            <v-icon left>done</v-icon>
            <span>Cadastrar</span>
        </v-btn>
        <v-btn dark @click="clean">Limpar</v-btn>   
    </v-layout>
    
    <v-snackbar
      v-model="snackbar" 
      :bottom="false"
      :left="false"
      :multi-line="true"
      :right="false"
      :timeout="6000"
      :top="true"
      :vertical="false">
    {{text}}
    <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
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
                ],
            snackbar: false,
            text: ""    
        };
    },
    methods: { 
        clean() {
            this.descricao = "";
            this.fabricante = "";
        },     
        submit() {
            let data = {
                "description": this.descricao,
                "manufacturer":this.fabricante
            };

            data = JSON.stringify( data );

            var vm = this;

            fetch("http://localhost:3000/product/register", {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: data
            }).then(function(response) {            
                if (response.ok){
                    vm.text = "Produto cadastrado com sucesso!";                
                    vm.snackbar = true;
                }else{
                    vm.text = "Erro ao cadastrar um produto!";                
                    vm.snackbar = true;
                }

                vm.clean();
            }).catch(function(error) {            
                vm.text = error;
                vm.snackbar = true;
                vm.clean();
            });
        }
    }
};
</script>