import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

// Define your typings for the store state.
export interface State {
  jwt_access_token: String
  jwt_expire_time: number
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
    jwt_access_token: '',
    jwt_expire_time: 0,
  },
  mutations: {
    // Updates JWT Access Token.
    update_jwt_access_token(state, token) {
      state.jwt_access_token = token
    },
    // Updates JWT expire time.
    update_jwt_expire_time(state, time) {
      state.jwt_expire_time = time
    },
  },
})
