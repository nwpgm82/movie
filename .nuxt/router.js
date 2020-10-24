import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _57d19174 = () => interopDefault(import('..\\pages\\admin.vue' /* webpackChunkName: "pages/admin" */))
const _ece66852 = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _abc38942 = () => interopDefault(import('..\\pages\\showTime\\index.vue' /* webpackChunkName: "pages/showTime/index" */))
const _31fc4014 = () => interopDefault(import('..\\pages\\showTime\\detail.vue' /* webpackChunkName: "pages/showTime/detail" */))
const _bab0396e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/admin",
    component: _57d19174,
    name: "admin"
  }, {
    path: "/contact",
    component: _ece66852,
    name: "contact"
  }, {
    path: "/showTime",
    component: _abc38942,
    name: "showTime"
  }, {
    path: "/showTime/detail",
    component: _31fc4014,
    name: "showTime-detail"
  }, {
    path: "/",
    component: _bab0396e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
