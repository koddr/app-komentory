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
    status: number
    first_name: string
    last_name: string
    about_me: string
    picture: string
    website_url: string
    abilities: string[]
    settings: {
      email_subscriptions: {
        transactional: boolean
        marketing: boolean
      }
    }
  }
}

// Define injection key.
export const key: InjectionKey<Store<State>> = Symbol()

/**
 * Define my own `useStore` composition function.
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
      status: 0,
      first_name: '',
      last_name: '',
      about_me: '',
      picture: '',
      website_url: '',
      abilities: [],
      settings: {
        email_subscriptions: {
          transactional: true,
          marketing: true,
        },
      },
    },
  },
  getters: {
    /**
     * Getter for checking user authentication.
     */
    isUserLoggedIn(state) {
      return state.current_user.id === '' // return true, if user is NOT logged in
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
        status: user.status,
        first_name: user.first_name,
        last_name: user.last_name,
        about_me: user.about_me,
        picture: user.picture,
        website_url: user.website_url,
        abilities: [...user.abilities],
        settings: {
          email_subscriptions: {
            transactional: user.settings.email_subscriptions.transactional,
            marketing: user.settings.email_subscriptions.marketing,
          },
        },
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
        status: 0,
        first_name: '',
        last_name: '',
        about_me: '',
        picture: '',
        website_url: '',
        abilities: [],
        settings: {
          email_subscriptions: {
            transactional: true,
            marketing: true,
          },
        },
      }
    },
  },
})
