import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Preferences from '../views/users/UserPreferences.vue'
import Registration from '../views/users/UserRegistration.vue'
import UserAuth from '../views/auth/UserAuth.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },

    {path: '/preferences', component: Preferences},
    {path: '/register', component: Registration},
    {path: '/auth', component: UserAuth}
  ]
})

export default router
