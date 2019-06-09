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
          <td>{{props.item.price}}</td>        
          <td>{{props.item.discount}}</td>
        </tr>
      </template>
    </v-data-table>          
    <v-layout>
      <v-flex xs12 md4>
        <v-select
        v-model="selected"
        :items="clients"
        item-text="name"
        label="Cliente"
        return-object
        ></v-select>
      </v-flex>      
      <v-flex xs12 md4>
        <v-btn @click="salvar">
          Finalizar Pedido
        </v-btn>
      </v-flex>
    </v-layout>      
  </v-card>  
</template>

<script>
import CartData from '../data/CartData';
import { log } from 'util';
export default {
    data(){
        return {
            cartProducts: CartData.getProducts(),
            selected: null,
            clients: [],
            totalValue: 0,
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
                    value: 'price'
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
          this.clients = data;
        }).catch(function(error){
          console.log(error);
        });
      },
      salvar(){
        if (!this.selected || this.cartProducts.length == 0)
          return;
        
        const newOrder = {
          "client": this.selected,
          "products": this.cartProducts
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