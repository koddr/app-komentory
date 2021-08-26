<template>
  <button
    class="px-3 py-2 border-2 bg-main text-white rounded-lg"
    :type="inputType"
    :tabindex="tabIndex"
  >
    <slot>Button</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    inputType: { type: String, default: 'button' },
    tabIndex: { type: String, required: true },
  },
})
</script>