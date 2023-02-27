<template>
</template>

<script>
import axios from "axios";
import {computed} from "vue";

export default {
  name: "Item",
  data() {
    return {
      data: []
    }
  },

  mounted() {
console.log(import.meta.env.VITE_API_URL + "list")
    axios.get(import.meta.env.VITE_API_URL + "list" + "?api_key=" + import.meta.env.VITE_API_KEY)
        .then(function (response) {
          // en cas de réussite de la requête
          console.log(response);
        })
        .catch(function (error) {
          // en cas d’échec de la requête
          console.log(error);
        })
        .finally(function () {
          // dans tous les cas
        });

  }
}
</script>

<style scoped>

</style>