<template>
  <!-- Main Container -->
  <div class="container mx-auto p-4">
    <!-- Remove Idea -->
    <teleport to="body">
      <RemoveIdea
        v-if="isModalActive"
        :name="ideaToRemove.name"
        @remove-ok="removeIdea"
        @remove-cancel="isModalActive = !isModalActive"
      />
    </teleport>
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
      <transition-group name="list-complete">
        <AppIdea
          v-for="idea in ideas"
          :key="idea.createdAt"
          :idea="idea"
          :user="user"
          class="idea"
          @vote-idea="voteIdea"
          @remove-idea="showRemoveIdea"
        />
      </transition-group>
      <!-- /Idea -->
    </div>
    <!-- /Main Box -->
  </div>
  <!-- End Main Container -->
</template>

<script>
import { ref, defineAsyncComponent } from 'vue'
import AppIdea from '../components/AppIdea.vue'
import AddIdea from '../components/AddIdea.vue'
import { auth, providerGoogle, db, ideasCollection, votesCollection } from '../services/Firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import {
  collection, addDoc, onSnapshot, query, doc, updateDoc,
  increment, orderBy, getDoc, setDoc, arrayUnion, deleteDoc, arrayRemove
} from 'firebase/firestore'

const RemoveIdea = defineAsyncComponent(() => import('../components/RemoveIdea.vue'))

export default {
  name: 'Home',
  components: {
    AppIdea,
    AddIdea,
    RemoveIdea
  },

  setup () {
    const ideas = ref([])
    const user = ref(null)
    const isModalActive = ref(false)
    let ideaToRemove = {}

    // Me conecto a firebase y obtengo el usuario actual
    onAuthStateChanged(auth, (auth) => {
      let userVotes = null
      if (auth) {
        user.value = auth
        // Obtengo la referencia a los votos de con esta id
        userVotes = doc(db, votesCollection, user.value.uid)
        // Me traigo los documentos asociados a esa id
        onSnapshot(userVotes, (doc) => {
          if (doc.exists()) {
            const document = doc.data()
            if ('ideas' in document) {
              user.value.votes = document.ideas
            }
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
        const { name, user, userName, votes, createdAt } = doc.data()
        newIdeas.push({ id, name, user, userName, votes, createdAt })
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
          createdAt: Date.now(),
          votes: 0
        })
        console.log('Documento salvado con ID: ', docRef.id)
      } catch (error) {
        console.error(error)
      }
    }

    const voteIdea = async ({ id, type }) => {
      try {
        // Obtengo el documento del voto par comprobar si ha votado, lo controlo antes que vaya al servidor
        const voteRef = doc(db, votesCollection, user.value.uid)
        let votes = await getDoc(voteRef)
        console.log('Votes: ', votes)
        if (votes.exists()) {
          votes = votes.data().ideas
          if (votes.find(vote => vote === id)) {
            throw new Error('user already voted!')
          }
        }

        console.log('Votando idea: ', id, type)
        // Actualizo la idea si puedo votarla.
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
        // Si he podido votar, entonces agrego el voto a la coleccion de votos
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

    const showRemoveIdea = ({ name, id }) => {
      ideaToRemove.name = name
      ideaToRemove.id = id
      isModalActive.value = true
    }

    const removeIdea = async () => {
      try {
        // Borramos de la lista de votesCollection
        const voteRef = doc(db, votesCollection, user.value.uid)
        await setDoc(voteRef, {
          ideas: arrayRemove(ideaToRemove.id)
        }, { merge: true })
        // Borro de la lista de ideasCollection
        const ideaRef = doc(db, ideasCollection, ideaToRemove.id)
        await deleteDoc(ideaRef)
        ideaToRemove = {}
        isModalActive.value = false
      } catch (error) {
        console.error(error)
      }
    }

    // Exponemos
    return {
      ideas,
      user,
      doLogin,
      doLogout,
      addIdea,
      voteIdea,
      isModalActive,
      ideaToRemove,
      showRemoveIdea,
      removeIdea
    }
  }
}
</script>

<style scoped>
.idea {
  transition: all 0.8s ease;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}

.list-complete-move {
  transition: transform 0.3s ease;
}

.idea {
  @apply bg-gray-200;
}
.idea:nth-of-type(1) {
  @apply bg-red-500;
}
.idea:nth-of-type(2) {
  @apply bg-red-400;
}
.idea:nth-of-type(3) {
  @apply bg-red-300;
}
.idea:nth-of-type(4) {
  @apply bg-red-200;
}
.idea:nth-of-type(5) {
  @apply bg-red-100;
}
.user-actions {
  @apply mt-2 text-center;
}
</style>
