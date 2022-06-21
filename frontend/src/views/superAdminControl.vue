<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SuperAdminControl',
  data() {
    return {
      loading: false,
    }
  },
    created() {
    this.postTeams()
  },
  methods: {
    ...mapActions(['invitedSuperAdmin', 'invitedOrganizationAdmin', 'createNewTeam', 'postTeams']),
    async inviteSuperAdmin() {
      this.invitedSuperAdmin({superAdminId: this.user._id})
    },
    async inviteOrganizationAdmin() {
      this.invitedOrganizationAdmin({superAdminId: this.user._id})
    },
    async createTeam() {
      this.createNewTeam({teamName: this.teamName, superAdminId: this.user._id})
    },
  },
  computed: {
    ...mapState(['user', 'inviteId', 'teams'])
  },
}
</script>

<template lang="pug">
.SuperAdminControl(v-if="user.title == 'SuperAdmin'")
  div Super Admin Page
    h1 {{user.name}}
    a-button(type="primary" @click="inviteSuperAdmin" :loading='loading') Invite Super Admin
    a-button(type="primary" @click="inviteOrganizationAdmin" :loading='loading') Invite Organization Admin
    span {{inviteId}}
  div(v-for="team in teams" :key="team.name")
    h1 team
    span {{team.name}}
  div Create new team
    a-input(placeholder="Team name..." v-model="teamName")
    a-button(type="primary" @click="createTeam" :loading='loading') Create
</template>
