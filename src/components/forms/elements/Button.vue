<template>
  <button class="px-4 py-3 border-2 bg-main text-white rounded-xl" type="button" :tabindex="tabIndex">
    <slot>Button</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    tabIndex: { type: String, required: true },
  },
})
</script>