<script>
import { mapState } from 'vuex'
export default {
  name: 'User',
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
.user(v-if="user.title == 'User'")
  h1 User Page
</template>
