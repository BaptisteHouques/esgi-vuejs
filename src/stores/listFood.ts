import { defineStore } from 'pinia'

export const listFoodStore = defineStore('listFood', {
  state: () => {
    return { listFood: [] as { id: number, description: string, cal: number }[] }
  },
  getters: {

  },
  actions: {
    // addItem(item: {id: number}) {
    //   this.listFood.push(item)
    // }
    setListFood(listFood: { id: number, description: string, cal: number }[]) {
      this.listFood = listFood
    }
  }

  // actions: {
  //   toKJ() {
  //     this.listFood
  //   },
  // },
})
