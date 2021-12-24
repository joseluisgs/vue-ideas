<template>
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
</template>

<script>
export default {
  name: 'AppIdea'
}
</script>

<style lang="scss" scoped>

</style>
