import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetail from '../views/ProductDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products/',
      name: 'products',
      component: ProductDetail
    },
    {
      path: '/products/:id',
      name: 'productDetail',
      component: ProductDetail
    }

  ]
})

export default router
