<template>
  <input
    :type="inputType"
    :placeholder="placeholder"
    :required="required"
    v-model="inputValue"
    class="px-3 py-2 border-2 rounded-lg"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Input',
  props: {
    inputType: { type: String, required: true },
    placeholder: { type: String, required: false },
    required: { type: Boolean, required: false },
  },
  data() {
    return {
      inputValue: this.inputValue,
    }
  },
})
</script>