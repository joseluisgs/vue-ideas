<template>
  <!-- Main Container -->
  <div class="container mx-auto p-4">
    <!-- Main Box -->
    <div class="rounded-lg bg-gray-100 shadow-lg w-full p-4">
      <h1 class="text-center mb-5 text-4xl">
        Idea Box
      </h1>
      <!-- Add Idea -->
      <AddIdea
        :user="user"
        @do-login="doLogin"
        @do-logout="doLogout"
      />
      <!-- Ideas -->
      <AppIdea
        v-for="(idea, $index) in ideas"
        :key="$index"
        :idea="idea"
      />
      <!-- /Idea -->
    </div>
    <!-- /Main Box -->
  </div>
  <!-- End Main Container -->
</template>

<script>
import { ref } from 'vue'
import AppIdea from '../components/AppIdea.vue'
import AddIdea from '../components/AddIdea.vue'
import data from '../services/data.json'
import Firebase from '../services/Firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
export default {
  name: 'Home',
  components: {
    AppIdea, AddIdea
  },

  setup () {
    const ideas = ref(data.ideas)
    const user = ref(null)
    // Me conecto a firebase y obtengo el usuario actual
    onAuthStateChanged(Firebase.auth, (auth) => (user.value = auth || null))
    // login
    const doLogin = async () => {
      try {
        await signInWithPopup(Firebase.auth, Firebase.providerGoogle)
      } catch (error) {
        console.error(error)
      }
    }
    // logout
    const doLogout = async () => {
      try {
        await signOut(Firebase.auth)
      } catch (error) {
        console.error(error)
      }
    }
    // Exponemos
    return { ideas, user, doLogin, doLogout }
  }
}
</script>

<style scoped>

</style>
