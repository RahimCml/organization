<script>
import { mapActions, mapState } from "vuex"
export default {
  name: 'Team',
  data() {
    return {
      loading: false,
    }
  },
    created() {
      this.fetchTeam({teamId: this.$route.params.id})
      this.loading = true
  },
  methods: {
    ...mapActions(['fetchTeam']),
  },
  computed: {
    ...mapState(['teamData'])
  }
}
</script>

<template lang="pug">
.team(v-if="user")
  div
    h1 name of team {{teamData.name}}
  div(v-for="teamdata in teamData.users" :key="teamdata.name")
    h1 consists of {{teamdata.name}}
</template>
