<template>
<v-card>
    <v-card-title>
      <h1>Carrinho</h1>    
                   
      <v-spacer></v-spacer>
           
    </v-card-title>
    
    <v-data-table
      :headers="headers"
      :items="cartProducts"
      :pagination.sync="pagination"        
      class="elevation-1"
     >      
      <template v-slot:items="props">
        <tr>
          <td>{{props.item.product.description}}</td>
          <td>{{props.item.quantity}}</td>
          <td>{{props.item.value}}</td>        
          <td>{{props.item.discount}}</td>
        </tr>
      </template>
    </v-data-table>        
    <v-flex xs12>
        <v-combobox
          v-model="select"
          :items="clients"
          chips
          label="Cliente"
        ></v-combobox>
      </v-flex>
    <v-btn @click="salvar">
      Finalizar Pedido
    </v-btn>    
  </v-card>  
</template>

<script>
import CartData from '../data/CartData';
import { log } from 'util';
export default {
    data(){
        return {
            cartProducts: CartData.getProducts(),
            select: '',
            clients: [],
            totalValue: 10,
            pagination:{
                rowsPerPage: 10
            },
            headers:[
                {
                    text: 'Produto',
                    value: 'description'
                },
                {
                    text: 'Quantidade',
                    value: 'quantity'
                },
                {
                    text: 'Valor Unitário',
                    value: 'value'
                },
                {
                    text: 'Desconto %',
                    value: 'discount'
                }
            ]
        }
    },
    mounted(){
      this.fetchClients();
    },
    methods: {
      fetchClients(){
        fetch("http://localhost:3000/client/").then(response => response.json()).then(data => {              
          
          data.array.forEach(element => {
            this.clients.push(element.name);
          });
        }).catch(function(error){
          console.log(error);
        });
      },
      salvar(){
        if( this.cartProducts.length == 0 ){
          console.log( "Vazio" );
          return;
        }
        const newOrder = {
          "products" : this.cartProducts,
          "totalValue": this.totalValue
        };
        const data = JSON.stringify( newOrder );

        var vm = this;

        fetch("http://localhost:3000/order/", {
              headers: {
                  'accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              method: "PUT",
              body: data
          }).then(function(response) {            
              vm.cartProducts = [];
          }).catch(function(error) {
            console.log(error);
          });

      }
    }
}
</script>