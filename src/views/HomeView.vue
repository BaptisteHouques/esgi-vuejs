<script setup lang="ts">
import SearchBar from "@/components/SearchBarComponent.vue";
import ShowSearchResults from "@/components/ShowSearchResultsComponent.vue";
</script>

<template>
  <h1>Search</h1>
  <SearchBar />
  <ShowSearchResults :products="products" />
</template>

<script lang="ts">
export default {
  data() {
    return {
      products: [
        {
          apiId: 888,
          nom: "Steak",
          calories: 180,
          desc: "lalalal"
        },
        {
          apiId: 444,
          nom: "Tomate",
          calories: 25,
          desc: "lalalal"
        },
        {
          apiId: 777,
          nom: "Poulet",
          calories: 156,
          desc: "Le bon poulet"
        }
      ]
    };
  }
}
</script>
