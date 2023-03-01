import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetail from '../views/ProductDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { transition: 'slide-left' },
    },
    {
      path: '/products/',
      name: 'products',
      component: ProductDetail,
      meta: { transition: 'slide-left' },
    },
    {
      path: '/products/:id',
      name: 'productDetail',
      component: ProductDetail,
      meta: { transition: 'slide-left' },
    }

  ]
})

export default router
