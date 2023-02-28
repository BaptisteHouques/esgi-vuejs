<script setup lang="ts">
import SearchBar from "@/components/SearchBarComponent.vue";
</script>

<template>
  <h1>Search</h1>
  <SearchBar @emitResults = "listFood = $event " />
  <ShowSearchResults :products="listFood" />
</template>

<script lang="ts">
import { listFoodStore } from '@/stores/listFood'

export default {
  data() {
    return {
      listFood: [],
    }
  },
  computed: {
    console: () => listFoodStore()
  }
}
</script>
