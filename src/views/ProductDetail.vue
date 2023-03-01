<template>
  <v-card :loading="getLoadingValue">
    <v-card-title>
      Detail du produit {{ product.description }}
    </v-card-title>
    <v-card-item>
      <u>Nutriments:</u>
      <div v-for="nutriment in product.foodNutrients" v-bind:key="nutriment">
        {{ nutriment.nutrient.name }}:  {{ nutriment.nutrient.number }} {{ nutriment.nutrient.unitName }}
      </div>
    </v-card-item>
  </v-card>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { listFoodStore } from '@/stores/listFood'

export default defineComponent({
  name: "ProductDetail.vue",
  data() {
    return {
      product: []
    }
  },
  mounted() {
    listFoodStore().setIsLoading(true)
    // let isInCache = false
    //
    // listFoodStore().searchCache.forEach(search => {
    //   search.results.forEach(result => {
    //     if (result.id === parseInt(this.$route.params.id)) {
    //       this.product = result
    //       listFoodStore().setIsLoading(false)
    //     }
    //   })
    // })

    // if (!isInCache) {
      axios.get(import.meta.env.VITE_API_URL + "food/" + this.$route.params.id + "?" + import.meta.env.VITE_API_KEY)
        .then(response => {
          this.product = response.data
          listFoodStore().setIsLoading(false)
        })
        .catch(error => {
          console.log(error)
          listFoodStore().setIsLoading(false)
        })
    // }
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