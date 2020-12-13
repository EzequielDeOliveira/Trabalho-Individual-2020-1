<template>
  <v-app>


    <v-main>
      <router-view/>
      <add-profile-fab @createdEvent="handleProfileCreation"/>
    </v-main>

  </v-app>
</template>

<script>
import AddProfileFab from '@/components/AddProfileFab'

export default {
  name: 'App',

  components: {
    AddProfileFab
  },

  methods: {
    handleProfileCreation (value) {
      this.$router.push({
        name: 'profileView', params: { id: value.id, profile: value }
      })
    }
  }
}
</script>
