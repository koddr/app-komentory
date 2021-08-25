import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    isAdmin?: boolean // is optional
    requiresAuth: boolean // must be declared by every route
  }
}
