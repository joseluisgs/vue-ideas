<template>
  <article class="rounded-lg bg-gray-300 mb-4 p-3 sm:(flex items-center) ">
    <!-- Info -->
    <section class="text-center sm:(flex-1 text-left) ">
      <h2 class="text-xl sm:(leading-6 text-2xl) ">
        {{ idea.name }}
      </h2>
      <small>{{ idea.userName }}
        <i>, {{ timeAgo(idea.createdAt) }}</i>
      </small>
    </section>
    <!-- Votos -->
    <section class="border-black border-t-2 mt-6 pt-3 sm:(pt-0 pl-3 border-t-0 border-l-2 mt-0 flex items-center) ">
      <h3
        id="votes"
        class="font-bold text-center text-3xl"
      >
        {{ idea.votes }}
      </h3>
      <nav
        v-if="user && !userVoted"
        class="flex justify-center sm:(block pl-2)"
      >
        <img
          id="voteup"
          class="cursor-pointer w-10"
          src="../assets/images/arrow.svg"
          alt="Vote up"
          @click="voteIdea(true)"
        >
        <img
          id="votedown"
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
import { computed } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('es')
dayjs.extend(relativeTime)

export default {
  name: 'AppIdea',
  props: {
    idea: {
      type: Object,
      required: true
    },
    user: {
      type: [Object, null]
    }
  },
  emits: ['vote-idea'],

  setup (props, { emit }) {
    const voteIdea = (type) => emit('vote-idea', { id: props.idea.id, type })
    const userVoted = computed(() => {
      if (props.user.votes) {
        return props.user.votes.find(item => item === props.idea.id)
      } else {
        return false
      }
    })

    const timeAgo = (timestamp) => {
      if (timestamp) {
        const date = new Date(timestamp)
        return dayjs().from(dayjs(date), true)
        // return dayjs(date).format('DD/MM/YYYY HH:mm:ss')
      }
      return ''
    }

    return { voteIdea, userVoted, timeAgo }
  }
}
</script>

<style lang="scss" scoped>

</style>
