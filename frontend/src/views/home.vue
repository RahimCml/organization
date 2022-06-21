<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data() {
    return{
      loading: false,
    }
  },
  computed: {
    ...mapState(['user']),
  }
}
</script>

<template lang="pug">
.home
  div
  div(v-if="user")
    h1 welcome {{user.name}}
    a-row.grid(v-if="user.title == 'SuperAdmin'")
      a-col.gridCol <router-link to="/superAdminControl"> Super Admin </router-link>
      a-col.gridCol <router-link to="/organizationAdminControl"> Organization Admin </router-link>
      a-col.gridCol <router-link to="/user"> User </router-link>
    a-row.grid(v-if="user.title == 'OrganizationAdmin'")
      a-col.gridCol <router-link to="/organizationAdminControl"> Organization Admin </router-link>
      a-col.gridCol <router-link to="/user"> User </router-link>
    a-row.grid(v-if="user.title == 'User'")
      a-col.gridCol <router-link to="/user"> User </router-link>
</template>

<style land="scss" scoped>

.grid{
  display: grid;
  height: 100px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 100px;
}
.gridCol{
  background-color: #cacad3de;
  text-align: center;
  padding: 36px;
}

</style>