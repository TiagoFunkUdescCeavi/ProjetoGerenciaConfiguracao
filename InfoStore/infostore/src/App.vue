<template>
  <v-app>    
    <v-toolbar dark>                
      <v-btn icon href="/">
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn icon href="/product">
        <v-icon>add_shopping_cart</v-icon>
      </v-btn>
      
      <v-spacer></v-spacer>          
      
      <v-toolbar-title class="white--text-uppercase">        
        Info Store   
      </v-toolbar-title>
      
    </v-toolbar>
    <v-content> 
      <router-view></router-view>     
    </v-content>  
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
    }
  }
}
</script>
