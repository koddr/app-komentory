<template>
  <div class="flex sm:h-full">
    <nav
      class="
        flex
        justify-between
        bg-main
        dark:bg-secondary-dark
        dark:border-b dark:border-secondary
        sm:dark:border-r sm:dark:border-b-0
        sm:flex-col
        sm:h-screen
        w-full
      "
    >
      <div class="mt-4">
        <router-link :to="{ name: 'index' }">
          <img
            class="w-12 h-12 mx-auto"
            src="https://cdn.komentory.com/favicons/bg-main_border-solid.svg"
            alt="komentory logo"
          />
        </router-link>
      </div>
      <div>
        <ul>
          <li class="py-2">
            <router-link :to="{ name: 'index' }"><CurrentUserAvatar /></router-link>
          </li>
          <li class="py-2">
            <router-link :to="{ name: 'projects' }">
              <NewspaperIcon class="h-10 w-10 mx-auto text-white dark:text-secondary heroicon-stroke-1" />
            </router-link>
          </li>
          <li class="py-2">
            <router-link :to="{ name: 'get-started' }">
              <AcademicCapIcon class="h-10 w-10 mx-auto text-white dark:text-secondary heroicon-stroke-0.7" />
            </router-link>
          </li>
        </ul>
      </div>
      <div class="mb-4">
        <router-link :to="{ name: 'logout' }">
          <LogoutIcon class="h-8 w-8 mx-auto text-white dark:text-secondary heroicon-stroke-1.2" />
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CurrentUserAvatar } from '__/components'
import { NewspaperIcon, AcademicCapIcon, LogoutIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'Sidebar',
  components: {
    CurrentUserAvatar,
    NewspaperIcon,
    AcademicCapIcon,
    LogoutIcon,
  },
})
</script>