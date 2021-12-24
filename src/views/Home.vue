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
import AppIdea from '../components/AppIdea.vue'
import data from '../services/data.json'
import { ref } from 'vue'
export default {
  name: 'Home',
  components: {
    AppIdea
  },

  setup () {
    const ideas = ref(data.ideas)
    return {
      ideas
    }
  }
}
</script>

<style scoped>
</style>
