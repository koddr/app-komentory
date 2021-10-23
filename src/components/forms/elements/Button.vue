<template>
  <button :class="`px-6 pt-3 pb-2.5 font-medium rounded-lg border-b-2 ${buttonStyle}`" :tabindex="tabIndex">
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
      light: '',
      dark: '',
      hover: {
        light: '',
        dark: '',
      },
    })

    //
    switch (props.action) {
      case 'success':
        style.value = {
          light: 'bg-main text-white border-main-lighter',
          dark: 'dark:text-secondary dark:border-main dark:bg-secondary-dark',
          hover: {
            light: 'hover:bg-main-light hover:text-main-darker',
            dark: 'dark:hover:bg-main dark:hover:border-main-dark hover:text-secondary-light',
          },
        }
    }

    //
    const { light, dark, hover } = style.value

    //
    const buttonStyle = `${light} ${hover.light} ${dark} ${hover.dark}`

    //
    return { buttonStyle }
  },
})
</script>