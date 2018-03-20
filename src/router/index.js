import Vue from 'vue'
import Router from 'vue-router'
import Restaurantes from '@/components/Restaurantes'
import Home from '@/components/Index'
import Registered from '@/components/Meetup/Registered'
import Pedidos from '@/components/Meetup/Pedidos'
import CadastrarParceiro from '@/components/Meetup/CadastrarParceiro'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import Individual from '@/components/Meetup/Individual'
import Pagamento from '@/components/Meetup/Pagamento'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/restaurantes',
      name: 'Restaurantes',
      component: Restaurantes
    },
    {
      path: '/pedidos',
      name: 'Pedidos',
      component: Pedidos
    },
    {
      path: '*',
      redirect: '/Home'
    },
    {
      path: '/registered',
      name: 'Registered',
      component: Registered
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/pagamento',
      name: 'Pagamento',
      component: Pagamento
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
      name: 'Entrar',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Usuário',
      component: Signup
    }
  ],
  mode: 'history'
})
