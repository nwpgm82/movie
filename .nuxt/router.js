import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _73c9231a = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _b006c0bc = () => interopDefault(import('..\\pages\\showTime\\index.vue' /* webpackChunkName: "pages/showTime/index" */))
const _202b379e = () => interopDefault(import('..\\pages\\showTime\\detail.vue' /* webpackChunkName: "pages/showTime/detail" */))
const _47872f4c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/contact",
    component: _73c9231a,
    name: "contact"
  }, {
    path: "/showTime",
    component: _b006c0bc,
    name: "showTime"
  }, {
    path: "/showTime/detail",
    component: _202b379e,
    name: "showTime-detail"
  }, {
    path: "/",
    component: _47872f4c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
