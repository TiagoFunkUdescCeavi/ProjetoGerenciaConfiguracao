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
          <td>{{props.item.description}}</td>
          <td>{{props.item.quantity}}</td>
          <td>{{props.item.value}}</td>           
          <td>{{props.item.discount}}</td>           
        </tr>
      </template>
    </v-data-table>    
  </v-card>  
</template>

<script>
import CartData from '../data/CartData';
export default {
    data(){
        return {
            cartProducts: CartData.getProducts(),
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
                    text: 'Desconto',
                    value: 'discount'
                }
            ]
        }
    },
    mounted(){
    }
}
</script>