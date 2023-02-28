<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar :elevation="2">
        <img id="app-icon" src="@/assets/images/calories.png" alt="Icon">

      <RouterLink to="/">Home</RouterLink>

    </v-app-bar>
    <main>
      <v-container>
        <RouterView />
      </v-container>
    </main>
  </v-app>
</template>

<style scoped>
#app-icon {
  height: 64px;
  margin-left: 10px;
}

main {
  margin-top: 71px;
}
</style>
