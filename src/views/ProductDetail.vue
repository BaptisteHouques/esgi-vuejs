<template>
  <v-card :loading="getLoadingValue">
    <v-card-title>
      Detail du produit {{ product.description }}
    </v-card-title>
    <v-card-item>
      <u>Nutriments:</u>
      <div v-for="nutriment in product.foodNutrients" v-bind:key="nutriment">
        {{ nutriment.nutrientName }}:  {{ nutriment.nutrientNumber }} {{ nutriment.unitName }}
      </div>
    </v-card-item>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { listFoodStore } from '@/stores/listFood'
import type ProductInterface from "@/interfaces/ProductInterface";

export default defineComponent({
  name: "ProductDetail.vue",
  data() {
    return {
      product: {} as ProductInterface
    }
  },
  mounted() {
    listFoodStore().setIsLoading(true)
    let isInCache = false

    listFoodStore().searchCache.forEach(search => {
      search.results.forEach(result => {
        if (result.fdcId.toString() === this.$route.params.id) {
          this.product = result
          isInCache = true
          listFoodStore().setIsLoading(false)
        }
      })
    })

    if (!isInCache) {
      axios.get(import.meta.env.VITE_API_URL + "food/" + this.$route.params.id + "?" + import.meta.env.VITE_API_KEY)
        .then((response) => {
          //Product recovered by this route doesn't have the same properties as ProductInterface
          //So in TS we have to define this response
          let tempProduct: {
          fdcId: number,
          description: string,
          foodNutrients: {
            nutrient: {
              name: string,
              number: number,
              unitName: string,
              rank: number
            }
          }[]
          } = response.data
          // Init a temporary list of Nutrients
          let tempFoodNutrients: {
            nutrientName: string,
            nutrientNumber: number,
            unitName: string
          }[] = []

          // Assign the response properties to the corresponding product properties
          this.product.fdcId = tempProduct.fdcId
          this.product.description = tempProduct.description

          // Foreach foodNutrient, push response nutrient to the temporary list
          tempProduct.foodNutrients.forEach((foodNutrient) => {
            tempFoodNutrients.push({nutrientName: foodNutrient.nutrient.name, nutrientNumber: foodNutrient.nutrient.number, unitName: foodNutrient.nutrient.unitName})
            if (foodNutrient.nutrient.name === "Energy")
              this.product.cal = foodNutrient.nutrient.rank
          })
          // Assign the temporary list of foodNutrients to the product list
          this.product.foodNutrients = tempFoodNutrients
          listFoodStore().setIsLoading(false)
        })
        .catch(error => {
          console.log(error)
          listFoodStore().setIsLoading(false)
        })
    }
  },
  computed: {
    getLoadingValue() {
      return listFoodStore().isLoading
    }
  }
})
</script>

<style scoped>

</style>