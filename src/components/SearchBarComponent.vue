<template>
    <v-text-field
        label="Produit"
        hide-details="auto"
        v-model="query"
    ></v-text-field>
    <div id="search-btn-div">
      <v-btn id="search-btn" append-icon="mdi-magnify" v-on:click="search">
        Rechercher
      </v-btn>
    </div>
</template>

<script lang="ts">
import axios, {AxiosError} from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchBarComponent",
  data () {
    return {
      query: ""
    }
  },
  emits: ["emitResults"],
  methods: {
    search() {
      axios.get(import.meta.env.VITE_API_URL + "search" + "?query=" + this.query + "&pageSize=10" + "&" + import.meta.env.VITE_API_KEY)
          .then((response) => {
            this.$emit("emitResults", response.data.foods)
          })
          .catch((error) => {
            console.log(error)
            this.showError(error)
          });
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