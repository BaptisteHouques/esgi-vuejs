<script setup lang="ts">
import SearchBar from "@/components/SearchBarComponent.vue";
import ShowSearchResults from "@/components/ShowSearchResultsComponent.vue";
</script>

<template>
  <h1>Search</h1>
  <SearchBar @emitResults = "listFood = $event " />
  <ShowSearchResults :products="products" />
</template>

<script lang="ts">
export default {
  data() {
    return {
      listFood: [],
    }
  }
}
</script>
