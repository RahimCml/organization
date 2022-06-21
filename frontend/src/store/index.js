import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const mutations = {
  SET_USER: 'user',
  INVITEID: 'inviteId',
  VALIDINVITE: 'validInvite',
}
export default new Vuex.Store({
  state: {
    user: null,
    inviteId: null,
  },
  mutations: {
    [mutations.SET_USER](state, user) {
      state.user = user
    },
    [mutations.INVITEID](state, inviteId) {
      state.inviteId = inviteId
    },
    [mutations.VALIDINVITE](state, validInvite) {
      state.validInvite = validInvite
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
    async invitedSuperAdmin({ commit }, { superAdminId }) {
      const res = await axios.post('/api/users/invite/superAdmin', { superAdminId })
      commit(mutations.INVITEID, res.data)
    },
    async invitedOrganizationAdmin({ commit }, { superAdminId }) {
      const res = await axios.post('/api/users/invite/organizationAdmin', { superAdminId })
      commit(mutations.INVITEID, res.data)
    },
    async checkInviteCodeForSuperAdmin({ commit }, { inviteCode }) {
      const res = await axios.post('/api/users/checkInviteCodeForSuperAdmin', { inviteCode })
      commit(mutations.VALIDINVITE, res.data)
    },
    async checkInviteCodeForOrganizationAdmin({ commit }, { inviteCode }) {
      const res = await axios.post('/api/users/checkInviteCodeForOrganization', { inviteCode })
      commit(mutations.VALIDINVITE, res.data)
    },
  },
  modules: {},
})
