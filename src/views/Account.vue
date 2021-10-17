<template>
  <div class="grid grid-cols-1 sm:grid-cols-12">
    <div>
      <Sidebar />
    </div>
    <div class="col-span-11">
      <div class="border-b py-4 px-2 sm:py-6 sm:px-6">
        <h1>Hi, {{ current_user.first_name }}!</h1>
      </div>
      <div class="py-4 px-2 sm:py-6 sm:px-6">
        <p>It's your account.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { Sidebar } from '__/components'

export default defineComponent({
  name: 'Account',
  computed: {
    ...mapState(['current_user']), // add current user from state
  },
  components: {
    Sidebar,
  },
})
</script>