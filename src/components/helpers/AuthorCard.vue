<template>
  <div class="mt-1 mb-1">
    <div class="inline-flex items-center space-x-2 text-sm text-gray-400">
      <img
        :src="picture ? picture : 'https://cdn.komentory.com/media/user/default-picture.svg'"
        class="w-7 h-7 border-2 border-main-light dark:border-secondary rounded-full"
        alt="user picture"
      />
      <div>
        <router-link :to="{ name: 'user-details', params: { id } }">{{ fullName }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthorCard',
  props: {
    id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    picture: { type: String, required: false },
  },
  setup: (props) => {
    // Define needed variables.
    const fullName = `${props.first_name} ${props.last_name}`

    // Return instances and lifecycle hooks.
    return { fullName }
  },
})
</script>