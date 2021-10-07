import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import * as store_const from '__/store-constants'

// Define your typings for the store state.
export interface State {
  jwt: {
    access_token: string
    expire: number
  }
  current_user: object
  current_project: object
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
    current_user: {}, // cached user data
    current_project: {}, // cached project data
  },
  mutations: {
    /**
     * Mutations for updating state.
     */

    // Update JWT data.
    [store_const.UPDATE_JWT](state, jwt) {
      state.jwt.access_token = jwt.access_token
      state.jwt.expire = jwt.expire
    },
    // Update current user data.
    [store_const.UPDATE_CURRENT_USER](state, user) {
      state.current_user = user
    },
    // Update current project data.
    [store_const.UPDATE_CURRENT_PROJECT](state, project) {
      state.current_project = project
    },

    /**
     * Mutations for removing state.
     */

    // Remove current state.
    [store_const.REMOVE_CURRENT_STATE](state) {
      state.jwt.access_token = ''
      state.jwt.expire = 0
      state.current_user = {}
      state.current_project = {}
    },
  },
})
