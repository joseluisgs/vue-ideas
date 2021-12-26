<template>
  <div class="w-full flex justify-center absolute top-40">
    <article class="w-3/4 p-4 bg-gray-300 shadow-2xl rounded-2xl">
      <p class="text-center text-xl text-red-900">
        Remove idea?
      </p>
      <p class="text-center text-xl">
        {{ name }}
      </p>
      <section class="flex justify-end">
        <button
          class="p-3 m-1 bg-red-500 text-white rounded-sm cursor-pointer"
          @click="$emit('remove-ok')"
        >
          OK
        </button>
        <button
          class="p-3 m-1 bg-gray-100 rounded-sm cursos-pointer"
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
