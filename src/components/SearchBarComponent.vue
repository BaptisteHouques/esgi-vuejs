<template>
    <v-text-field
        label="Produit"
        hide-details="auto"
        v-model="query"
    ></v-text-field>
    <div id="search-btn-div">
      <v-btn id="search-btn" append-icon="mdi-magnify" v-on:click="search" :loading="getLoadingValue">
        Rechercher
      </v-btn>
    </div>
</template>

<script lang="ts">
import axios, {AxiosError} from "axios";
import { defineComponent } from "vue";
import { listFoodStore } from '@/stores/listFood'

export default defineComponent({
  name: "SearchBarComponent",
  data () {
    return {
      query: "",
    }
  },
  emits: ["emitResults"],
  methods: {
    search() {
      listFoodStore().setIsLoading(true)
      let existInCache = false

      listFoodStore().searchCache.forEach(el => {
        if (el.search.toUpperCase() === this.query.toUpperCase()) {
          existInCache = el
          return
        }
      })

      if (!existInCache) {
        axios.get(import.meta.env.VITE_API_URL + "search" + "?query=" + this.query + "&pageSize=10" + "&" + import.meta.env.VITE_API_KEY)
            .then((response) => {
              // // Define Response Type
              // let listFood: {
              //   fdcId: number,
              //   description: string,
              //   foodNutrients: {
              //     nutrientName: string,
              //     nutrientNumber: number
              //   }[]
              // }[]
              //
              // listFood = response.data.foods
              // let newListFood: {id: number, description: string, cal: number}[] = []
              //
              // listFood.forEach(food => {
              //   let tempObject = {id: food.fdcId, description: food.description, cal: 0}
              //   food.foodNutrients.forEach(fd => {
              //     if (fd.nutrientName === "Energy")
              //       tempObject.cal = fd.nutrientNumber
              //   })
              //   newListFood.push(tempObject)
              // })
              // listFoodStore().setListFood(newListFood)
              listFoodStore().addToSearchCache({
                search: this.query,
                results: response.data.foods
              })

              console.log('jutilise lapi')
              this.$emit("emitResults", response.data.foods)
              listFoodStore().setIsLoading(false)
            })
            .catch((error) => {
              console.log(error)
              this.showError(error)
            });
      } else {
        console.log('jutilise le cache')
        this.$emit("emitResults", existInCache.results)
        listFoodStore().setIsLoading(false)
      }
    },
    showError(error: AxiosError) {
      if (error.response) {
        switch (error.response.status){
          case 400:
            console.log("erreur dans la requête")
                break
          case 500:
            console.log('erreur server')
                break
        }

      }
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
#search-btn {
  margin-top: 15px;
}

#search-btn-div {
  width: 100%;
  text-align: center;
}
</style>