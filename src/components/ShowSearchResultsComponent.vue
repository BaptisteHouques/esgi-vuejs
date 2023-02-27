<template>
  <template v-for="product in products" v-bind:key="product">
    {{ product }}
    <RouterLink :to="{ name: 'productDetail', params: { id: product.apiId }}">Detail</RouterLink>
  </template>
</template>

<script>
export default {
  name: "ShowSearchResultsComponent",
  props: {
    products: Array
  }
}
</script>

<style scoped>

</style>