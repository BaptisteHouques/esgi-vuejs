import { defineStore } from 'pinia'

export const listFoodStore = defineStore('listFood', {
  state: () => {
    return {
      listFood: [] as { id: number, description: string, cal: number }[],
      isLoading: false,
      searchCache: [],
      coeff: 4.184
    }
  },
  actions: {
    setListFood(listFood: { id: number, description: string, cal: number }[]) {
      this.listFood = listFood
    },

    setIsLoading(value: boolean) {
      this.isLoading = value
    },

    addToSearchCache(value: any) {
      // @ts-ignore
      this.searchCache.push(value)
    }
    
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
