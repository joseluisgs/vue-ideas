<template>
  <section class="mb-6">
    <!-- aplico flex a partir de sm: 640, asi son los puntos de ruptura -->
    <form
      class="sm:flex"
      @submit.prevent="addIdea"
    >
      <input
        v-model="idea"
        type="text"
        required
        class="rounded-t-md w-full p-3
              sm:(flex-auto rounded-none rounded-l-md) "
        placeholder="Add your idea"
      >
      <input
        v-if="user"
        type="submit"
        value="Add idea"
        class="rounded-b-md bg-gray-600 text-white w-full p-2 sm:(flex-1 rounded-none rounded-r-md) "
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
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'AddIdea',
  props: {
    user: {
      type: [Object, null]
    }
  },
  emits: ['do-login', 'do-logout', 'add-idea'],

  setup (props, { emit }) {
    const idea = ref('')

    const doLogin = () => emit('do-login')
    const doLogout = () => emit('do-logout')
    const addIdea = () => {
      emit('add-idea', idea.value.trim())
      idea.value = ''
    }

    // Exponemos
    return { idea, doLogin, doLogout, addIdea }
  }
}
</script>

<style scoped>
</style>
