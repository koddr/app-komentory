<template>
  <input
    class="px-3 py-2 border-2 rounded-lg"
    @input="$emit('update:modelValue', $event.target.value)"
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
    tabIndex: { type: String, required: true },
    placeholder: { type: String, default: '' },
    modelValue: { type: String, default: '' },
    isRequired: { type: Boolean, default: false },
  },
})
</script>