<script setup lang="ts">
import SearchBar from "@/components/SearchBarComponent.vue";
import ShowSearchResults from "@/components/ShowSearchResultsComponent.vue";
</script>

<template>
  <main>
    <h1>Search</h1>
    <SearchBar @emitResults = "listFood = $event " />
    <ShowSearchResults />
  </main>
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
