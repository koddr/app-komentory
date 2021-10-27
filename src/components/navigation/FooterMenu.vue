<template>
  <div class="grid grid-cols-1 sm:grid-cols-12 xl:grid-cols-24 w-full bg-secondary-darker dark:bg-secondary-darkest">
    <div class="sm:col-span-12 xl:col-start-7">
      <div class="py-4 px-2 sm:px-6 lg:px-8">
        <p>Footer</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterMenu',
})
</script>