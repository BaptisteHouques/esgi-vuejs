<template>
<h1>Search</h1>
  <SearchBar />
  <ShowSearchResults />
</template>

<script>
import SearchBar from "@/components/SearchBarComponent.vue";
import ShowSearchResults from "@/components/ShowSearchResultsComponent.vue";
export default {
  name: "SearchComponent",
  components: {
    SearchBar,
    ShowSearchResults
  }

}
</script>

<style scoped>

</style>