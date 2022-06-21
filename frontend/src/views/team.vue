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
      this.fetchUser()
      this.fetchTeam({teamId: this.$route.params.id})
      this.loading = true
  },
  methods: {
    ...mapActions(['fetchUser', 'fetchTeam', 'joinUser']),
    addUser(userdata) {
      this.joinUser({teamId: this.$route.params.id, userId: userdata._id})
      this.loading = true
    },
  },
  computed: {
    ...mapState(['userData', 'user', 'teamData'])
  }
}
</script>

<template lang="pug">
.team(v-if="user")
  div
    h1 name of team {{teamData.name}}
  div(v-for="teamdata in teamData.users" :key="teamdata.name")
    h1 consists of {{teamdata.name}}
  div( v-if="user.title == 'SuperAdmin' || user.title == 'OrgazinationAdmin' " v-for="userdata in userData" :key="userdata.name")
    h1 {{userdata.name}}
    a-button(type="primary" v-on:click="addUser(userdata)") Add
</template>
