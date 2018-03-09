import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Registered from '@/components/Meetup/Registered'
import Pedidos from '@/components/Meetup/Pedidos'
import CadastrarParceiro from '@/components/Meetup/CadastrarParceiro'
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
      name: 'Restaurantes',
      component: Home
    },
    {
      path: '/pedidos',
      name: 'Pedidos',
      component: Pedidos
    },
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/registered',
      name: 'Registered',
      component: Registered
    },
    {
      path: '/restaurantes/:id',
      props: true,
      name: 'Finalize seu pedido',
      component: Individual
    },
    {
      path: '/parceiro/novo',
      name: 'Cadastrar Parceiro',
      component: CadastrarParceiro,
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
