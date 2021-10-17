<template>
  <img
    :src="
      $store.state.current_user.picture
        ? $store.state.current_user.picture
        : 'https://cdn.komentory.com/media/user/default-picture.svg'
    "
    class="w-12 h-12 mx-auto border-2 border-main-light dark:border-secondary rounded-full"
    alt="user picture"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CurrentUserAvatar',
})
</script>