<template>
  <!-- <button
    class="
      relative
      inline-flex
      items-center
      justify-start
      px-6
      py-3
      font-medium
      overflow-hidden
      transition-all
      rounded-lg
      group
      bg-main
      dark:hover:bg-secondary-dark dark:bg-secondary-dark
    "
    :tabindex="tabIndex"
  >
    <span
      class="
        absolute
        bottom-0
        left-0
        w-72
        h-72
        mb-14
        ml-14
        rotate-[-45deg]
        -translate-x-full
        ease-out
        duration-500
        transition-all
        translate-y-full
        rounded-lg
        group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0
        bg-main-light
        dark:bg-main
      "
    ></span>
    <span
      class="
        relative
        transition-colors
        duration-300
        ease-in-out
        w-full
        text-white
        group-hover:text-secondary-darker
        dark:text-secondary-light dark:group-hover:text-secondary-light
      "
    >
      <slot>Button Text</slot>
    </span>
  </button> -->
  <button
    class="
      relative
      inline-flex
      items-center
      justify-center
      px-10
      py-4
      overflow-hidden
      font-mono font-medium
      tracking-tighter
      text-white
      bg-gray-800
      rounded-lg
      group
    "
  >
    <span
      class="
        absolute
        w-0
        h-0
        transition-all
        duration-500
        ease-out
        bg-green-500
        rounded-full
        group-hover:w-56 group-hover:h-56
      "
    ></span>
    <span
      class="
        absolute
        inset-0
        w-full
        h-full
        -mt-1
        rounded-lg
        opacity-30
        bg-gradient-to-b
        from-transparent
        via-transparent
        to-gray-700
      "
    ></span>
    <span class="relative"><slot>Button Text</slot></span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    tabIndex: { type: Number, required: true },
  },
})
</script>