<template>
Detail du produit {{ this.$route.params.id }}
  <br>
  {{ product.description }}
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductDetail.vue",
  data() {
    return {
      product: []
    }
  },
  mounted() {
    axios.get(import.meta.env.VITE_API_URL + "food/" + this.$route.params.id + "?" + import.meta.env.VITE_API_KEY)
      .then(response => {
        console.log(response.data)
        this.product = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
})
</script>

<style scoped>

</style>