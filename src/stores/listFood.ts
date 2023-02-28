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
    
    // Function that convert Kcal to Kj
    convertListToKj() {
      let list = this.listFood
      list.forEach(el => el.cal = el.cal * this.coeff)
      return list
    },

    convertToKj(cal: number): number {
      return cal * this.coeff
    }
  }
})
