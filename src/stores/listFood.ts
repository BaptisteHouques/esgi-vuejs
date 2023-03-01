import { defineStore } from 'pinia'
import type ProductInterface from "@/interfaces/ProductInterface";

export const listFoodStore = defineStore('listFood', {
  state: () => {
    return {
      isLoading: false,
      searchCache: [] as {search: string, results: ProductInterface[]}[],
      coeff: 4.184
    }
  },
  actions: {
    setIsLoading(value: boolean) {
      this.isLoading = value
    },

    addToSearchCache(value: {search: string, results: ProductInterface[]}) {
      let inserted = false
      this.searchCache.forEach(el => {
        if (el.search.toUpperCase() === value.search.toUpperCase()) {
          el.results = value.results
          inserted = true
        }
      })
      if (!inserted) {
        this.searchCache.push(value)
      }
    },

    convertToKj(cal: number): number {
      return cal * this.coeff
    }
  }
})
