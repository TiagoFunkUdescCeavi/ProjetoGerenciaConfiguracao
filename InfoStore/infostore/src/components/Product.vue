<template>
  <v-dialog v-model="dialog" persistent max-width="800">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>add</v-icon>
      </v-btn>
    </template>    
    <v-card>    
      <v-card-title>
        <span class="headline">Cadastro de Produto</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>              
            <v-flex xs12>
              <v-text-field label="Descrição*" v-model="descricao" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Fabricante*" v-model="fabricante" required></v-text-field>
            </v-flex>              
            
          </v-layout>
        </v-container>
        <small>*Indica campos obrigatórios</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="submit">Salvar</v-btn>          
        <v-btn color="blue darken-1" flat @click="close">Fechar</v-btn>
      </v-card-actions>
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
    </v-card>  
  </v-dialog>   
</template>

<script>
export default {    
    data() {
        return {
            registered: false,
            dialog: false,
            descricao: "",
            fabricante: "",
            snackbar: false,
            text: ""    
        };
    },
    mounted(){
      this.registered = false;
    },
    methods: { 
        close() {
          this.dialog = false;
          this.$emit("OnCloseProductScreen", this.registered);
        },
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
            console.log(data);
            fetch("http://localhost:3000/product/", {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: data
            }).then(function(response) {            
                if (response.ok){
                    vm.registered = true;
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