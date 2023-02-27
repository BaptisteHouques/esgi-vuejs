<template>
  <input v-model="query">
  <button v-on:click="search">button</button>
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
      axios.get(import.meta.env.VITE_API_URL + "searc" + "?query=" + this.query + "&pageSize=1" + "&" + import.meta.env.VITE_API_KEY)
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

</style>