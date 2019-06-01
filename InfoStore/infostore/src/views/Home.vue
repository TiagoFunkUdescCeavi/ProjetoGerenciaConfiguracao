<template>
  <v-card>
    <v-card-title>
      <h1>Produtos</h1>
      
      <productRegister v-on:meuEvento="closeProductScreen"></productRegister>
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
      :items="products"
      :search="search"
      :pagination.sync="pagination"        
      class="elevation-1"
     >      
      <template v-slot:items="props">
        <tr>          
          <td>{{props.item.description}}</td>
          <td>{{props.item.manufacturer}}</td> 
          <td class="text-xs-center">
            <v-btn icon>
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon 
              @click="deleteProduct(props.item._id, props.item.description,props.item.manufacturer)">
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
import productRegister from '../components/Product'
export default {
  data() {
    return {
      pagination: {
        rowsPerPage: 10
      },
      search: '',
      headers: [
          {
            text: 'Descrição',
            value: 'description'
          },
          { 
            text: 'Fabricante', 
            value: 'manufacturer' 
          },
          {
            text: 'Opções',
            value: '_id',
            sortable: false,
            align: 'center'            
          }          
        ],
      products: []
    }
  },
  components: {
        'productRegister': productRegister
  },
  methods: {
    closeProductScreen(ProductRegistered) {
      console.log( ProductRegistered );
      if (ProductRegistered)
        this.fetchProducts();
    },
    fetchProducts(){
      fetch("http://localhost:3000/product/").then(response => response.json()).then(data => {
          this.products = data;
        }).catch(function(error) {
          console.error(error);
        });    
    },
    deleteProduct(_id, description, manufacturer){
      var data = {
        "_id": _id,
        "description": description,
        "manufacturer": manufacturer
      }
      fetch("http://localhost:3000/product/", {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify( data )
      }).then(function(response){
        // console.error(response);
      }).catch( function(error){
        console.error(error);
      });

      this.fetchProducts();
    }
  },
  mounted() {
    this.fetchProducts();    
  }
}
</script>
