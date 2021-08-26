<template>
  <button type="button" class="px-3 py-2 border-2 bg-main text-white rounded-lg">
    <slot>Button</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
})
</script>