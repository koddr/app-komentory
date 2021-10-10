import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import * as store_const from '__/store-constants'

// Define your typings for the store state.
export interface State {
  jwt: {
    access_token: string
    expire: number
  }
  current_user: {
    id: string
    email: string
    user_status: number
    first_name: string
    last_name: string
    about_me: string
    picture: string
    website_url: string
    abilities: string[]
  }
  current_project: {
    id: string
  }
}

// Define injection key.
export const key: InjectionKey<Store<State>> = Symbol()

/**
 * Define your own `useStore` composition function.
 *
 * Now, by importing your own composable function, you can retrieve the typed store without
 * having to provide the injection key and its typing.
 */
export function useStore() {
  return baseUseStore(key)
}

// Define store.
export const store = createStore<State>({
  state: {
    jwt: {
      access_token: '',
      expire: 0,
    },
    current_user: {
      id: '',
      email: '',
      user_status: 0,
      first_name: '',
      last_name: '',
      about_me: '',
      picture: '',
      website_url: '',
      abilities: [],
    },
    current_project: {
      id: '',
    },
  },
  mutations: {
    /**
     * Mutations for updating state.
     */

    // Update JWT data.
    [store_const.UPDATE_JWT](state, jwt) {
      state.jwt = {
        access_token: jwt.token,
        expire: jwt.expire,
      }
    },
    // Update current user data.
    [store_const.UPDATE_CURRENT_USER](state, user) {
      state.current_user = {
        id: user.id,
        email: user.email,
        user_status: user.user_status,
        first_name: user.user_attrs.first_name,
        last_name: user.user_attrs.last_name,
        about_me: user.user_attrs.about_me,
        picture: user.user_attrs.picture,
        website_url: user.user_attrs.website_url,
        abilities: [...user.user_attrs.abilities],
      }
    },
    // Update current project data.
    [store_const.UPDATE_CURRENT_PROJECT](state, project) {
      state.current_project = {
        id: project.id,
      }
    },

    /**
     * Mutations for removing state.
     */

    // Remove current state.
    [store_const.REMOVE_CURRENT_STATE](state) {
      state.jwt = {
        access_token: '',
        expire: 0,
      }
      state.current_user = {
        id: '',
        email: '',
        user_status: 0,
        first_name: '',
        last_name: '',
        about_me: '',
        picture: '',
        website_url: '',
        abilities: [],
      }
      state.current_project = {
        id: '',
      }
    },
  },
})
