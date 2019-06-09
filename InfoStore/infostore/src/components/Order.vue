<template>
  <v-card>    
    <v-card-title>
      <span class="headline">Pedido {{description}}</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>              
          <v-flex xs12>
            <v-text-field label="Quantidade" v-model="quantity" type="number" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Preço" v-model="price" type="number" prefix="R$" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Desconto" v-model="discount" type="number" suffix="%" required></v-text-field>
          </v-flex>          
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click="submit">Salvar</v-btn>          
      <v-btn color="blue darken-1" flat @click="close">Fechar</v-btn>
    </v-card-actions>    
  </v-card>     
</template>

<script>
export default{
    data(){
        return{
            description:"",
            quantity:"",
            price:"",
            discount:"",
            order: null
        }    
    },
    created(){
        this.$emit("updateOrderItem", this.updateOrderItem);
    },
    methods:{
        updateOrderItem(orderItem){
            this.order = orderItem;
            this.description = orderItem.product.description;
            console.log(orderItem);
            this.quantity = orderItem.quantity;            
            this.price = orderItem.price;
            this.discount = orderItem.discount;            
        },
        submit(){
            this.order.quantity = this.quantity;
            this.order.price = this.price;
            this.order.discount = this.discount;
            this.close();
        },
        close(){
            this.$emit("OnCloseOrderScreen");
        }
    }
}
</script>