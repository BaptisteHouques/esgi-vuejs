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
import { listFoodStore } from '@/stores/listFood'
import type ProductInterface from "@/interfaces/ProductInterface";

export default {
  name: "ShowSearchResultsComponent",
  props: {
    products: {} as ProductInterface[]
  },
  methods: {
    searchEnergy(nutrients: { value: number; nutrientName: string; unitName: number }[]) {
      let energy = "Pas d'infos sur les calories"
      nutrients.forEach(nutrient => {
        if (nutrient.nutrientName === 'Energy') {
          let kj = listFoodStore().convertToKj(nutrient.value).toFixed(2)
          energy = `Calories: ${nutrient.value} ${nutrient.unitName} (${kj} KJ)`
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