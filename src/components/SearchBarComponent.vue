<template>
    <v-text-field
        label="Produit"
        hide-details="auto"
        v-model="query"
    ></v-text-field>
    <div id="search-btn-div">
      <v-responsive
          id="nbrChoice"
          class="mx-auto"
          max-width="170"
      >
        <v-text-field v-model="nbrResult" :rules="nbrRules" label="Nombre de résultat" variant="outlined" hide-details="auto"></v-text-field>
      </v-responsive>
      <v-btn id="search-btn" append-icon="mdi-magnify" v-on:click="search">
        Rechercher
      </v-btn>
      <v-alert
          id="alertBox"
          v-if="alert.title"
          type="error"
          :title="alert.title"
          :text="alert.desc"
      ></v-alert>
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
      nbrResult: 10,
      nbrRules: [(v: number) => ( v && v <= 50 ) || "La valeur maximale est de 50"],
      alert: {} as {title: string, desc: string}
    }
  },
  emits: ["emitResults"],
  methods: {
    // Utilise l'endpoint de recherche de l'API de nutrition
    search() {
      if (this.nbrResult <= 50) {
        axios.get(import.meta.env.VITE_API_URL + "search" + "?query=" + this.query + "&pageSize=" + this.nbrResult + "&" + import.meta.env.VITE_API_KEY)
            .then((response) => {
              // Définition du type de la réponse de l'API
              let listFood: {
                fdcId: number,
                description: string,
                foodNutrients: {
                  nutrientName: string,
                  value: number
                }[]
              }[]

              listFood = response.data.foods
              let newListFood: { id: number, description: string, cal: number }[] = []

              // Création d'une nouvelle liste avec seulement les propriétés recherchées
              listFood.forEach(food => {
                let tempObject = {id: food.fdcId, description: food.description, cal: 0}
                food.foodNutrients.forEach(fd => {
                  if (fd.nutrientName === "Energy")
                    tempObject.cal = fd.value
                })
                newListFood.push(tempObject)
              })

              // Ajout de la listFood dans le store
              listFoodStore().setListFood(newListFood)

              // Passage de la reponse de l'API au composant parent
              this.$emit("emitResults", response.data.foods)
            })
            .catch((error) => {
              this.showError(error)
            });
      }
    },

    // Fonction d'affichage des erreurs de l'API à l'utilisateur
    showError(error: AxiosError) {
      if (error.response) {
        switch (error.response.status){
          case 400:
            this.alert = {title: "Erreur 400", desc: "Erreur lors de la recherche, veuillez réessayer."}
                break
          case 500:
            this.alert = {title: "Erreur 500", desc: "Problème avec le serveur distant, réessayer plus tard."}
                break
        }
      }
    }
  }
})
</script>

<style scoped>
#search-btn {
  margin-top: 10px;
}

#search-btn-div {
  width: 100%;
  text-align: center;
}

#nbrChoice {
  margin-top: 5px;
  padding-top: 5px;
}

#alertBox {
  margin-top: 10px;
}
</style>