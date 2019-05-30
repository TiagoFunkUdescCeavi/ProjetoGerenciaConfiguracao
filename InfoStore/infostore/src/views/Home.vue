<template>
  <v-card>
    <v-card-title>
      <h1>Produtos</h1>
      
      <v-dialog v-model="dialog" persistent max-width="800">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>add</v-icon>
          </v-btn>
        </template> 
        <v-card>
          <productRegister></productRegister>
        </v-card>
      </v-dialog>        

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
          <td>
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
import productRegister from '../components/Product'
export default {
  data() {
    return {
      dialog: false,
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
            text: 'Excluir',
            value: '_id',
            sortable: false
          }          
        ],
      products: []
    }
  },
  mounted() {
    fetch("http://localhost:3000/product/")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.products = data;
      })
      .catch(function(error) {
        console.error(error);
      })
    // console.log(data);
  },
  components: {
        'productRegister': productRegister
    }
}
</script>
