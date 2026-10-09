import { createRootRoute, createRoute, createRouter, redirect } from '@tanstack/react-router'
import App from './App'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import SettingPage from './pages/SettingPage'

const rootRoute = createRootRoute({ component: App })

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/home' })
  },
})

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'auth',
  component: AuthPage,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'home',
  component: HomePage,
})

const settingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'setting',
  component: SettingPage,
})

const routeTree = rootRoute.addChildren([indexRoute, authRoute, homeRoute, settingRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
