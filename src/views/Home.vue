<template>
  <!-- Main Container -->
  <div class="container mx-auto p-4">
    <!-- Main Box -->
    <div class="w-full bg-gray-100 shadow-lg p-4 rounded-lg">
      <h1 class="mb-5 text-4xl text-center">
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
            type="submit"
            value="Add idea"
            class="w-full p-2 bg-gray-600 text-white sm:flex-1"
          >
        </form>
      </section>
      <!-- Ideas -->
      <article class="p-3 rounded-lg bg-gray-300 sm:(flex items-center)">
        <!-- Info -->
        <section class="text-center sm:(flex-1 text-left)">
          <h2 class="text-xl sm:(leading-6 text-2xl)">
            Esto es una idea lorem ipsum dolor sit amet.
          </h2>
          <small>Username</small>
        </section>
        <!-- Votos -->
        <section class="pt-3 border-t-2 mt-6 border-black sm:(pt-0 pl-3 border-t-0 border-l-2 mt-0 flex items-center)">
          <h3 class="text-3xl font-bold text-center">
            99
          </h3>
          <nav class="flex justify-center sm:(block pl-2)">
            <img
              class="w-10 cursor-pointer"
              src="../assets/images/arrow.svg"
              alt="Vote up"
            >
            <img
              class="w-10 cursor-pointer transform -rotate-180"
              src="../assets/images/arrow.svg"
              alt="Vote down"
            >
          </nav>
        </section>
      </article>
      <!-- /Idea -->
    </div>
    <!-- /Main Box -->
  </div>
  <!-- End Main Container -->
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
</style>
