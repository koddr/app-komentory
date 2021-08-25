<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :required="required"
    class="px-3 py-2 rounded-lg"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Input',
  data() {
    return {
      type: 'input',
      placeholder: '',
      required: false,
    }
  },
})
</script>