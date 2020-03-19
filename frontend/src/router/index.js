import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import signup from '../views/signup.vue'
import login from '../views/login.vue'
import board from '../views/board.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/:id',
    name: 'board',
    component: board
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from './views/Home.vue'
// import About from './views/About.vue'
// import Test from './views/Test.vue'
// import UserDetails from './views/UserDetails.vue'
// import toyAppPage from '@/views/toy-app.page';
// import toyEditPage from '@/views/toy-edit.page';
// import toyDetailsPage from '@/views/toy-details.page';

// Vue.use(Router)

// export default new Router({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       component: About
//     },
//     {
//       path: '/test',
//       name: 'test',
//       component: Test
//     },
//     {
//       path: '/user/:id',
//       name: 'user-details',
//       component: UserDetails
//     },
//     {
//       path: '/toy',
//       name: 'toy-app',
//       component: toyAppPage
//     },
//     {
//       path: '/toy/edit/:id?',
//       name: 'toy-edit',
//       component: toyEditPage
//     },
//     {
//       path: '/toy/:id',
//       name: 'toy-details',
//       component: toyDetailsPage
//     }
//   ]
// })
