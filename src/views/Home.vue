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
        @add-idea="addIdea"
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
import { auth, providerGoogle, db, ideasCollection } from '../services/Firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
export default {
  name: 'Home',
  components: {
    AppIdea,
    AddIdea
  },

  setup () {
    const ideas = ref(data.ideas)
    const user = ref(null)

    // Me conecto a firebase y obtengo el usuario actual
    onAuthStateChanged(auth, (auth) => (user.value = auth || null))
    // login
    const doLogin = async () => {
      try {
        await signInWithPopup(auth, providerGoogle)
      } catch (error) {
        console.error(error)
      }
    }
    // logout
    const doLogout = async () => {
      try {
        await signOut(auth)
      } catch (error) {
        console.error(error)
      }
    }
    // Add Idea
    const addIdea = async (idea) => {
      try {
        // Agrego la idea a firebase
        const docRef = await addDoc(collection(db, ideasCollection), {
          name: idea,
          user: user.value.uid,
          userName: user.value.displayName,
          createdAt: new Date(),
          votes: 0
        })
        console.log('Documento salvado con ID: ', docRef.id)
      } catch (error) {
        console.error(error)
      }
    }

    // Exponemos
    return { ideas, user, doLogin, doLogout, addIdea }
  }
}
</script>

<style scoped>
</style>
