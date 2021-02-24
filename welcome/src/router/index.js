import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'Signin',
    // route level code-splitting
    // this generates a separate chunk (signin.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "signin" */ '../views/Signin.vue')
  }
]

// TODO: Find why I had to hardcode this route
const router = createRouter({
  history: createWebHistory('/hello/'),
  routes
})

export default router
