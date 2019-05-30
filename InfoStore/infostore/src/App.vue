<template>
  <v-app>    
    <v-toolbar dark>   
      <v-toolbar-title class="white--text">        
        Info Store   
      </v-toolbar-title>  

      <v-spacer></v-spacer>          

      <v-btn icon href="/">
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      
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
