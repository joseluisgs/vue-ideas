<template>
  <!-- Main Container -->
  <div class="container mx-auto p-4">
    <!-- Main Box -->
    <div class="rounded-lg bg-gray-100 shadow-lg w-full p-4">
      <h1 class="text-center mb-5 text-4xl">
        Idea Box
      </h1>
      <!-- Add Idea -->
      <section class="mb-6">
        <!-- aplico flex a partir de sm: 640, asi son los puntos de ruptura -->
        <form class="sm:flex">
          <input
            type="text"
            required
            class="w-full p-3
              sm:flex-auto"
            placeholder="Add your idea"
          >
          <input
            v-if="user"
            type="submit"
            value="Add idea"
            class="bg-gray-600 text-white w-full p-2 sm:flex-1"
          >
        </form>
        <p
          v-if="!user"
          class="mt-2 text-center"
        >
          Please <a
            class="font-bold text-blue-500 underline"
            href="#"
            @click="doLogin"
          > do login </a> to add an idea.
        </p>
        <p
          v-else
          class="mt-2 text-center"
        >
          Hi 👋 {{ user.displayName }}. <a
            class="font-bold text-green-600 underline"
            href="#"
            @click="doLogout"
          > Logout </a>.
        </p>
      </section>
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
import data from '../services/data.json'
import Firebase from '../services/Firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
export default {
  name: 'Home',
  components: {
    AppIdea
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
    return {
      ideas,
      user,
      doLogin,
      doLogout
    }
  }
}
</script>

<style scoped>

</style>
