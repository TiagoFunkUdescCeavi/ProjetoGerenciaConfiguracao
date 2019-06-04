<template>
  <v-dialog v-model="dialog" persistent max-width="800">
    <template v-slot:activator="{ on }">
      <v-btn icon 
        v-on="on"
        @click="iconClick">
        <v-icon>{{iconName}}</v-icon>
      </v-btn>
    </template>    
    <v-card>    
      <v-card-title>
        <span class="headline">Cadastro de Cliente</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>              
            <v-flex xs12>
              <v-text-field label="Nome*" v-model="name" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="CPF*" v-model="cpf" :mask="cpfMask" required></v-text-field>
            </v-flex>              
            <v-flex xs12>
              <v-text-field label="Logradouro*" v-model="street" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Número*" v-model="houseNumber" :mask="numMask" required></v-text-field>
            </v-flex>              
            <v-flex xs12>
              <v-text-field label="Bairro*" v-model="neighborhood" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Cidade*" v-model="city" required></v-text-field>
            </v-flex>              
            <v-flex xs12>
              <v-text-field label="CEP*" v-model="cep" :mask="cepMask" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Estado*" v-model="state" required></v-text-field>
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
        name: "",
        cpf: "",
        street: "",
        houseNumber: "",
        neighborhood: "",
        city: "",
        cep: "",
        state: "",
        snackbar: false,
        text: "",
        cpfMask: "###.###.###-##",
        cepMask: "#####-###",
        numMask: "#####",
        itemObject: this.item
      };
    },
    mounted(){
      this.registered = false;
    },
    props:{
      item: Object,
      iconName: String
    },
    methods: { 
        close() {
          this.dialog = false;
          this.$emit("OnCloseClientScreen", this.registered);
          this.registered = false;
        },
        clean() {          
          this.descricao = "";
          this.fabricante = "";                       
        },     
        iconClick() {
          this.registered = false;

          if (this.itemObject){            
            this.descricao = this.itemObject.description;
            this.fabricante = this.itemObject.manufacturer;
          }
        },
        updateItem(){
          let data = JSON.stringify({
            "name": this.name,
            "cpf": this.cpf,
            "street": this.street,
            "houseNumber": this.houseNumber,
            "neighborhood": this.neighborhood,
            "city": this.city,
            "cep": this.cep,
            "state": this.state
          });

          var vm = this;
          
          fetch("http://localhost:3000/client/", {
              headers: {
                  'accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              method: "POST",
              body: data
          }).then(function(response) {                          
              if (response.ok){       
                vm.registered = true;
                vm.text = "Cliente alterado com sucesso!";
                vm.snackbar = true;
                vm.close();
              }else{
                vm.text = "Erro ao alterar cliente!";                
                vm.snackbar = true;
              }           
          }).catch(function(error) {
            vm.text = error;
            vm.snackbar = true;
          });            
        },
        saveItem(){
          let data = JSON.stringify({
            "name": this.name,
            "cpf": this.cpf,
            "street": this.street,
            "houseNumber": this.houseNumber,
            "neighborhood": this.neighborhood,
            "city": this.city,
            "cep": this.cep,
            "state": this.state
          });
          
          var vm = this;                

          fetch("http://localhost:3000/client/", {
              headers: {
                  'accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              method: "PUT",
              body: data
          }).then(function(response) {            
              if (response.ok){
                  vm.registered = true;
                  vm.text = "Cliente cadastrado com sucesso!";                
                  vm.snackbar = true;                    
              }else{
                  vm.text = "Erro ao cadastrar cliente!";                
                  vm.snackbar = true;
              }
              vm.clean();
          }).catch(function(error) {            
              vm.text = error;
              vm.snackbar = true;
              vm.clean();
          });            
        },
        submit() {
          if (this.itemObject)
            this.updateItem();
          else this.saveItem();          
        }
    }
};
</script>