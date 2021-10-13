<template>
  <div class="mt-1 mb-1">
    <div class="inline-flex space-x-2 text-sm text-gray-400">
      <div class="inline-flex space-x-1">
        <CalendarIcon class="h-5 w-5" />
        <div>{{ dateFormatted }}</div>
      </div>
      <div v-if="withTime" class="inline-flex space-x-1">
        <ClockIcon class="h-5 w-5" />
        <div>{{ timeFormatted }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CalendarIcon, ClockIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'DateFormatted',
  components: {
    CalendarIcon,
    ClockIcon,
  },
  props: {
    date: { type: String, required: true },
    locale: { type: String, required: true },
    withTime: { type: Boolean, default: false },
  },
  setup: (props) => {
    // Define needed variables.
    const date = new Date(props.date)

    // Formatted date.
    const dateFormatted = date.toLocaleDateString(props.locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // Formatted time.
    const timeFormatted = `${date.getHours()}:${date.getMinutes()}`

    // Return instances and lifecycle hooks.
    return { dateFormatted, timeFormatted }
  },
})
</script>