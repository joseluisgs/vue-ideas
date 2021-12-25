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
import { auth, providerGoogle, db, ideasCollection } from '../services/Firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { collection, addDoc, onSnapshot, query } from 'firebase/firestore'
export default {
  name: 'Home',
  components: {
    AppIdea,
    AddIdea
  },

  setup () {
    const ideas = ref([])
    const user = ref(null)

    // Me conecto a firebase y obtengo el usuario actual
    onAuthStateChanged(auth, (auth) => (user.value = auth || null))

    // Obtener ideas en tiempos real, primero la consulta, luego la recorro y la guardo en el array
    const q = query(collection(db, ideasCollection))
    onSnapshot(q, (querySnapshot) => {
      const newIdeas = []
      querySnapshot.forEach((doc) => {
        const id = doc.id
        const { name, user, userName, votes } = doc.data()
        newIdeas.push({ id, name, user, userName, votes })
      })
      console.log('New Ideas: ', newIdeas)
      ideas.value = newIdeas
    },
    (error) => console.log('Error: ', error)
    )

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
