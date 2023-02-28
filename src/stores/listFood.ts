import { defineStore } from 'pinia'

export const listFoodStore = defineStore('listFood', {
  state: () => {
    return {
      listFood: [] as { id: number, description: string, cal: number }[],
      isLoading: false,
      searchCache: []
    }
  },
  getters: {

  },
  actions: {
    // addItem(item: {id: number}) {
    //   this.listFood.push(item)
    // }
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
  }

  // actions: {
  //   toKJ() {
  //     this.listFood
  //   },
  // },
})
