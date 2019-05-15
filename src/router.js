import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import About from './views/About.vue'
import Learner from './views/Learner.vue'
import Arithmetic from './views/Arithmetic.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Arithmetic
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/learner',
      name: 'learner',
      component: Learner,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/arithmetic',
      name: 'arithmetic',
      component: Arithmetic
    }
  ]
})

router.beforeEach((to, from, next) => {

  if (to.matched.some((record) => record.meta.requiresAuth)) {

    if (store.getters.isLoggedIn) {

      return next()

    }

  return next('/login')

  }

  return next()

})

export default router
