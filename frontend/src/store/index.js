import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const mutations = {
  SET_USER: 'user',
}
export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    [mutations.SET_USER](state, user) {
      state.user = user
    },
  },
  actions: {
    async registerUser(ctx, user) {
      return axios.post('/api/users/register', { user })
    },
    async registerSuperAdmin(ctx, superadmin) {
      return axios.post('/api/users/register', { superadmin })
    },
    async registerOrganizationAdmin(ctx, organizationadmin) {
      return axios.post('/api/users/register', { organizationadmin })
    },
    async login({ commit }, credentials) {
      const user = await axios.post('/api/users/session', credentials)
      commit(mutations.SET_USER, user.data)
    },
  },
  modules: {},
})
