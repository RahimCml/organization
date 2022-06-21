<script>
import { mapState } from 'vuex'
export default {
  name: 'OrganizationAdminControl',
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<template lang="pug">
.OrganizationAdminControl(v-if="user.title == 'OrgazinationAdmin'")
  h1 Organization Admin Page
</template>
