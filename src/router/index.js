import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
  { path: '/register', name: 'Register', component: () => import('../views/Register.vue') },
  { path: '/rental', name: 'Rental', component: () => import('../views/Rental.vue') },
  { path: '/rental/:id', name: 'RentalDetail', component: () => import('../views/RentalDetail.vue') },
  { path: '/secondhand', name: 'SecondHand', component: () => import('../views/SecondHand.vue') },
  { path: '/secondhand/:id', name: 'SecondHandDetail', component: () => import('../views/SecondHandDetail.vue') },
  { path: '/publish', name: 'Publish', component: () => import('../views/Publish.vue'), meta: { requiresAuth: true } },
  { path: '/ai-detection', name: 'AIDetection', component: () => import('../views/AIDetection.vue') },
  { path: '/profile', name: 'Profile', component: () => import('../views/Profile.vue'), meta: { requiresAuth: true } },
  { path: '/dashboard', name: 'Dashboard', component: () => import('../views/Dashboard.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('camerahub_user') || 'null')
  if (to.meta.requiresAuth && !user) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
