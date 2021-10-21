<template>
  <input
    class="
      px-5
      py-3
      border-2
      text-base
      rounded-lg
      w-full
      h-full
      text-secondary-darker
      dark:bg-secondary dark:border-secondary-dark
    "
    @input="$emit('update:modelValue', handleInputChange($event))"
    :type="inputType"
    :tabindex="tabIndex"
    :placeholder="placeholder"
    :value="modelValue"
    :required="isRequired"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Input',
  props: {
    inputType: { type: String, required: true },
    tabIndex: { type: Number, required: true },
    placeholder: { type: String, default: '' },
    modelValue: { type: String, default: '' },
    isRequired: { type: Boolean, default: false },
  },
  setup: () => {
    // Define event handler for input change.
    const handleInputChange = (event: Event) => (event.target as HTMLInputElement).value
    return { handleInputChange }
  },
})
</script>