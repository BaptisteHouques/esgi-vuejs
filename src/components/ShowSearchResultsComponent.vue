<template>
  <template v-for="product in products" v-bind:key="product">
    <v-card id="card" :title="product.description" :subtitle="product.foodCategory">
      <v-card-text>
<!--        {{ product.ingredients }}-->
        {{ searchEnergy(product.foodNutrients) }}
      </v-card-text>
      <v-card-actions>
        <RouterLink :to="{ name: 'productDetail', params: { id: product.fdcId }}">Detail</RouterLink>
      </v-card-actions>
    </v-card>
  </template>
</template>

<script lang="ts">
export default {
  name: "ShowSearchResultsComponent",
  props: {
    products: Array
  },
  methods: {
  searchEnergy(nutrients: { [x: string]: {
      value: any;
      nutrientName: string; unitName: any;
    }; }) {
    let energy = "Pas d'infos sur les calories"
    Object.keys(nutrients).forEach(key => {
      if (nutrients[key].nutrientName === 'Energy') {
        energy = `Calories: ${nutrients[key].value} ${nutrients[key].unitName}`
      }
    });
    return energy
  }
  }
}
</script>

<style scoped>
#card {
  margin-top: 20px;
}
</style>