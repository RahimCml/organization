<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SuperAdminControl',
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    ...mapActions(['invitedSuperAdmin', 'invitedOrganizationAdmin']),
    async inviteSuperAdmin() {
      this.invitedSuperAdmin({superAdminId: this.user._id})
    },
    async inviteOrganizationAdmin() {
      this.invitedOrganizationAdmin({superAdminId: this.user._id})
    },
  },
  computed: {
    ...mapState(['user', 'inviteId'])
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
</template>
