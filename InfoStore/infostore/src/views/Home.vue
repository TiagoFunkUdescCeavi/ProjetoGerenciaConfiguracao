<template>
  <div>
    <h1>Produtos</h1>
    <v-card flat class="pa-3" v-for="product in products" :key="product.description">
      <v-layout row wrap>
        <v-flex>
          <div class="title">Descrição</div>
          <div class="subheading mt-2">{{product.description}}</div>
        </v-flex>
        <v-flex>
          <div class="title">Fabricante</div>
          <div class="subheading mt-2">{{product.manufacturer}}</div>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    sortBy(prop) {
      this.products.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
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
      });
    // console.log(data);
  }
};
</script>
