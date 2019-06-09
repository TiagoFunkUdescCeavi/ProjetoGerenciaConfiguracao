<template>
  <v-card>
    <v-card-title>
      <h1>Pedidos {{client}}</h1>    

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
      :items="orders"
      :search="search"
      :pagination.sync="pagination"        
      class="elevation-1"
     >      
      <template v-slot:items="props">
        <tr>                    
          <td>{{props.item._id}}</td> 
          <td>R$ {{getTotalPrice(props.item.products)}}</td> 
          <td>{{getProductsName(props.item.products)}}</td>
          <td class="text-xs-center">
            <v-btn icon >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>delete</v-icon>
            </v-btn>
          </td>       
        </tr>
      </template>
    </v-data-table>        
  </v-card>  
</template>

<script>
export default {
  data() {
    return {
      pagination: {
        rowsPerPage: 10
      },
      search: '',
      headers: [
          { 
            text: 'Identificador', 
            value: '_id' 
          },
          { 
            text: 'Valor Total', 
            value: 'totalPrice' 
          },
          {
            text: "Produtos",
            value: 'products'
          },
          {
            text: 'Opções',
            value: '_id',
            sortable: false,
            align: 'center'            
          }          
        ],
      orders: [],
      client: "",
      clientObj: null
    }
  },
  created(){
    this.$emit("OrderScreenCreated", this.updateClient);
  },
  methods:{
    updateClient(item){      
      this.clientObj = item;
      this.client = this.clientObj.name;
      this.fetchOrders();
    },
    getProductsName(products){
      var names = "";

      function addNames(item){
        names += item.product.description + "; ";
      }

      products.forEach(addNames);
      
      return names;
    },
    getTotalPrice(products){
      var totalPrice = 0.0;

      function sum(item){
        var itemVal = item.price * item.quantity;
        totalPrice += (itemVal * (1 - (item.discount / 100)));
      }

      products.forEach(sum);

      return totalPrice;
    },
    fetchOrders(){
      if (this.clientObj){
        fetch("http://localhost:3000/order/client?id=" + this.clientObj._id).then(response => response.json()).then(data => {              
          this.orders = data;
        }).catch(function(error){
          console.log(error);
        });        
      }
    }
  }
}
</script>
