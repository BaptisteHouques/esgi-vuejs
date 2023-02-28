<template>
  <div v-if="getLoadingValue" class="middle-div">
    <v-progress-circular
        indeterminate
        color="black"
    ></v-progress-circular>
  </div>
  <template v-else>
    <template v-if="products.length">
      <v-card v-for="product in products" v-bind:key="product" id="card" :title="product.description" :subtitle="product.foodCategory">
        <v-card-text>
          {{ searchEnergy(product.foodNutrients) }}
        </v-card-text>
        <v-card-actions>
          <RouterLink :to="{ name: 'productDetail', params: { id: product.fdcId }}">Detail</RouterLink>
        </v-card-actions>
      </v-card>
    </template>

    <template v-else>
      <div class="middle-div">
        Pas de résultat
      </div>
    </template>

  </template>
</template>

<script lang="ts">
import {listFoodStore} from "@/stores/listFood";

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
  },
  computed: {
    getLoadingValue() {
      return listFoodStore().isLoading
    }
  }
}
</script>

<style scoped>
.middle-div {
  text-align: center;
  margin-top: 250px;
}

#card {
  margin-top: 20px;
}
</style>