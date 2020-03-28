import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import signup from '../views/signup.vue'
import login from '../views/login.vue'
import userPage from '../views/user.page.vue'
import board from '../views/board.vue'
import taskDetails from '../views/task-details.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
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
    path: '/userPage',
    name: 'user-page',
    component: userPage
  },
  // {
  //   path: '/:id',
  //   name: 'board',
  //   component: board
  // },
  // {
  //   path: '/task/:id',
  //   name: 'task-details',
  //   component: taskDetails
  // },
  {
    path: '/:id', name: 'board', component: board,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/task/:id',
        name: 'task-details',
        component: taskDetails
      }
    ]
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
