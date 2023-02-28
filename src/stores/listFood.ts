import { defineStore } from 'pinia'

export const listFoodStore = defineStore('listFood', {
  state: () => {
    return {
      isLoading: false,
      searchCache: [] as {search: string, results: {id: number, description: string, foodCategory: string, foodNutrients: {}[], cal: number}[]}[],
      coeff: 4.184
    }
  },
  actions: {
    setIsLoading(value: boolean) {
      this.isLoading = value
    },

    addToSearchCache(value: {search: string, results: {id: number, description: string, foodCategory: string, foodNutrients: {}[], cal: number}[]}) {
      // @ts-ignore
      this.searchCache.push(value)
    },

    convertToKj(cal: number): number {
      return cal * this.coeff
    }
  }
})
