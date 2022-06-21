import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Register from '../views/register.vue'
import Login from '../views/login.vue'
import OrganizationAdminControl from '../views/organizationAdminControl.vue'
import User from '../views/user.vue'
import SuperAdminControl from '../views/superAdminControl.vue'
import Invite from '../views/invite.vue'
import Team from '../views/team.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/organizationAdminControl',
    name: 'OrganizationAdminControl',
    component: OrganizationAdminControl,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
  },
  {
    path: '/superAdminControl',
    name: 'SuperAdminControl',
    component: SuperAdminControl,
  },
  {
    path: '/invite',
    name: 'Invite',
    component: Invite,
  },
  {
    path: `/team/:id`,
    name: 'Team',
    component: Team,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
