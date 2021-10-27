<template>
  <img
    :src="current_user.picture ? current_user.picture : 'https://cdn.komentory.com/media/user/default-picture.svg'"
    class="w-10 h-10 mx-auto border-2 rounded-full border-secondary-light dark:border-main"
    alt="user picture"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'CurrentUserAvatar',
  computed: {
    ...mapState(['current_user']),
  },
})
</script>