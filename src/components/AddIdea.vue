<template>
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
</template>

<script>
export default {
  name: 'AddIdea',
  props: {
    user: {
      type: [Object, null]
    }
  },
  emits: ['do-login', 'do-logout'],

  setup (props, { emit }) {
    const doLogin = () => emit('do-login')
    const doLogout = () => emit('do-logout')
    // Exponemos
    return { doLogin, doLogout }
  }
}
</script>

<style scoped>
</style>
