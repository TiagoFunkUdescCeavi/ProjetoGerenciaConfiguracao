<template>
  <v-card>
    <v-card-title>
      <h1>Clientes</h1>
      <clientRegister 
        iconName="add"
        v-on:OnCloseClientScreen="closeClientScreen">
      </clientRegister>
      <v-spacer></v-spacer>
      
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    
    <v-data-table
      :headers="headers"
      :items="clients"
      :search="search"
      :pagination.sync="pagination"        
      class="elevation-1"
     >      
      <template v-slot:items="props">
        <tr>          
          <td>{{props.item.name}}</td>
          <td>{{props.item.cpf}}</td>
          <td>{{props.item.street}}</td>
          <td>{{props.item.houseNumber}}</td>
          <td>{{props.item.neighborhood}}</td>
          <td>{{props.item.city}}</td>
          <td>{{props.item.cep}}</td>
          <td>{{props.item.state}}</td>
          <td class="text-xs-center">
            <v-btn icon>
              <v-icon >
                edit
              </v-icon>
            </v-btn>
            <v-btn icon>              
              <v-icon >
                delete
              </v-icon>
            </v-btn>
          </td>       
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import clientRegister from '../components/Client'
export default {
    data() {
        return {
            pagination: {
                rowsPerPage: 10},
        search: '',
        headers: [
            {
                text: 'Nome',
                value: 'name'
            },
            { 
                text: 'CPF', 
                value: 'cpf' 
            },
            { 
                text: 'Logradouro', 
                value: 'street' 
            },
            { 
                text: 'Número', 
                value: 'houseNumber' 
            },
            { 
                text: 'Bairro', 
                value: 'neighborhood' 
            },
            { 
                text: 'Cidade', 
                value: 'city' 
            },
            { 
                text: 'CEP', 
                value: 'cep' 
            },
            { 
                text: 'Estado', 
                value: 'state' 
            },
            {
                text: 'Opções',
                value: '_id',
                sortable: false,
                align: 'center'            
            }          
            ],
        clients: []
        }
    },
    components: {
        'clientRegister': clientRegister
    },
    methods: {
        fetchClients(){
            fetch("http://localhost:3000/client/").then(response => response.json()).then(data => {
                this.clients = data;
            }).catch(function(error){
                console.log(error);
            });
        },
        closeClientScreen(pRegistered){
            if (pRegistered)
              this.fetchClients();
        }
    },
    mounted(){
        this.fetchClients();
    }
}
</script>