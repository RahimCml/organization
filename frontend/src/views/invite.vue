<script>
import { mapActions } from 'vuex'
export default {
  name: 'Invite',
  data() {
    return {
      inviteCodeSuperAdmin: '',
      inviteCodeOrganizationAdmin: '',
      loading: false,
    }
  },
  methods: {
    ...mapActions(['checkInviteCodeForSuperAdmin', 'checkInviteCodeForOrganizationAdmin']),
    checkCodeForSuperAdmin() {
      this.checkInviteCodeForSuperAdmin({inviteCode: this.inviteCodeSuperAdmin})
    },
    checkCodeForOrganizationAdmin() {
      this.checkInviteCodeForOrganizationAdmin({inviteCode: this.inviteCodeOrganizationAdmin})
    }
  }
}
</script>

<template lang="pug">
.user
  div Add invite code below
    div For Super Admin 
      a-input(placeholder="Add invite code here..." v-model="inviteCodeSuperAdmin")
      <router-link to="/register">
        span(@click="checkCodeForSuperAdmin" role="button") Check
      </router-link>
    div For Organization Admin
      a-input(placeholder="Add invite code here..." v-model="inviteCodeOrganizationAdmin")
      <router-link to="/register">
        span(@click="checkCodeForOrganizationAdmin" role="button") Check
      </router-link>
</template>
