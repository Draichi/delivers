import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Registered from '@/components/Meetup/Registered'
import Parceiro from '@/components/Meetup/Parceiro'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import Individual from '@/components/Meetup/Individual'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/registered',
      name: 'Registered',
      component: Registered,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetups/:id',
      props: true,
      name: 'Finalize seu pedido',
      component: Individual
    },
    {
      path: '/parceiro/novo',
      name: 'Cadastrar Parceiro',
      component: Parceiro,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ],
  mode: 'history'
})
