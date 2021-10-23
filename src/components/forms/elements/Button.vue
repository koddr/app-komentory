<template>
  <button class="px-6 pt-3 pb-2.5 font-medium border-b-2 rounded-lg" :class="buttonStyle" :tabindex="tabIndex">
    <slot>Button Text</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    action: { type: String, required: true },
    tabIndex: { type: Number, required: true },
  },
  setup: (props) => {
    //
    const style = ref({
      bg: {
        light: '',
        dark: '',
      },
      border: {
        light: '',
        dark: '',
      },
      text: {
        light: '',
        dark: '',
      },
      hover: {
        light: '',
        dark: '',
      },
    })

    //
    switch (props.action) {
      case 'success':
        style.value = {
          bg: {
            light: 'bg-main',
            dark: 'dark:bg-secondary-dark',
          },
          border: {
            light: 'border-main-lighter',
            dark: 'dark:border-main',
          },
          text: {
            light: 'text-white',
            dark: 'dark:text-secondary',
          },
          hover: {
            light: 'hover:bg-main-light hover:text-main-darker hover:text-secondary-light',
            dark: 'dark:hover:bg-main dark:hover:border-main-dark ',
          },
        }
    }

    //
    const { bg, border, text, hover } = style.value

    //
    const buttonStyle = `${bg.light} ${border.light} ${text.light} ${hover.light} ${bg.dark} ${border.dark} ${text.dark} ${hover.dark}`

    //
    return { buttonStyle }
  },
})
</script>