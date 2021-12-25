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
        :user="user"
        @vote-idea="voteIdea"
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
import { auth, providerGoogle, db, ideasCollection, votesCollection } from '../services/Firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import {
  collection, addDoc, onSnapshot, query, doc, updateDoc,
  increment, orderBy, getDoc, setDoc, arrayUnion
} from 'firebase/firestore'
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
    onAuthStateChanged(auth, (auth) => {
      let userVotes = null
      if (auth) {
        user.value = auth
        userVotes = doc(db, votesCollection, user.value.uid)
        onSnapshot(userVotes, (doc) => {
          const document = doc.data()
          if ('ideas' in document) {
            user.value.votes = document.ideas
          }
        })
      } else {
        user.value = null
        userVotes && userVotes()
      }
    })

    // Obtener ideas en tiempos real, primero la consulta, luego la recorro y la guardo en el array
    const q = query(collection(db, ideasCollection), orderBy('votes', 'desc'))
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

    const voteIdea = async ({ id, type }) => {
      try {
        console.log('Votando idea: ', id, type)
        const ideaRef = doc(db, ideasCollection, id)
        const idea = (await getDoc(ideaRef)).data()
        let toVote = false
        // incremento: https://firebase.google.com/docs/firestore/manage-data/add-data
        if (!type && idea.votes > 0) {
          await updateDoc(ideaRef, {
            votes: increment(-1)
          })
          toVote = true
        } else if (type) {
          await updateDoc(ideaRef, {
            votes: increment(1)
          })
          toVote = true
        }
        if (toVote) {
          const voteRef = doc(db, votesCollection, user.value.uid)
          await setDoc(voteRef, {
            ideas: arrayUnion(id)
          }, { merge: true })
        }
      } catch (error) {
        console.error(error)
      }
    }

    // Exponemos
    return { ideas, user, doLogin, doLogout, addIdea, voteIdea }
  }
}
</script>

<style scoped>
</style>
