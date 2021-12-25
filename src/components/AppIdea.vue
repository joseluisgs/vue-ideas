<template>
  <article class="rounded-lg bg-gray-300 mb-4 p-3 sm:(flex items-center) ">
    <!-- Info -->
    <section class="text-center sm:(flex-1 text-left) ">
      <h2 class="text-xl sm:(leading-6 text-2xl) ">
        {{ idea.name }}
      </h2>
      <small>by: {{ idea.userName }}</small>
    </section>
    <!-- Votos -->
    <section class="border-black border-t-2 mt-6 pt-3 sm:(pt-0 pl-3 border-t-0 border-l-2 mt-0 flex items-center) ">
      <h3 class="font-bold text-center text-3xl">
        {{ idea.votes }}
      </h3>
      <nav class="flex justify-center sm:(block pl-2) ">
        <img
          class="cursor-pointer w-10"
          src="../assets/images/arrow.svg"
          alt="Vote up"
          @click="voteIdea(true)"
        >
        <img
          class="cursor-pointer transform w-10 -rotate-180"
          src="../assets/images/arrow.svg"
          alt="Vote down"
          @click="voteIdea(false)"
        >
      </nav>
    </section>
  </article>
</template>

<script>
export default {
  name: 'AppIdea',
  props: {
    idea: {
      type: Object,
      required: true
    }
  },
  emits: ['vote-idea'],

  setup (props, { emit }) {
    const voteIdea = (type) => emit('vote-idea', { id: props.idea.id, type })

    return { voteIdea }
  }
}
</script>

<style lang="scss" scoped>

</style>
