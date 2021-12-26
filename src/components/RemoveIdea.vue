<template>
  <div class="flex w-full top-40 justify-center absolute">
    <article class="bg-gray-300 rounded-2xl p-4 shadow-2xl w-3/4">
      <p class="text-center text-xl text-red-900">
        Remove idea?
      </p>
      <p class="text-center text-xl">
        {{ name }}
      </p>
      <section class="flex justify-end">
        <button
          class="rounded-sm cursor-pointer bg-red-500 m-1 text-white p-3"
          @click="$emit('remove-ok')"
        >
          OK
        </button>
        <button
          class="rounded-sm bg-gray-100 m-1 p-3 cursos-pointer"
          @click="$emit('remove-cancel')"
        >
          Cancel
        </button>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  name: 'RemoveIdea',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  emits: ['remove-ok', 'remove-cancel'],
  setup () {
    return {}
  }
}
</script>

<style scoped>

</style>
