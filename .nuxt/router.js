import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ece66852 = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _abc38942 = () => interopDefault(import('..\\pages\\showTime\\index.vue' /* webpackChunkName: "pages/showTime/index" */))
const _14e774d5 = () => interopDefault(import('..\\pages\\admin\\addMovie.vue' /* webpackChunkName: "pages/admin/addMovie" */))
const _78a50993 = () => interopDefault(import('..\\pages\\admin\\cost.vue' /* webpackChunkName: "pages/admin/cost" */))
const _da87674c = () => interopDefault(import('..\\pages\\admin\\searchPaid.vue' /* webpackChunkName: "pages/admin/searchPaid" */))
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
    path: "/contact",
    component: _ece66852,
    name: "contact"
  }, {
    path: "/showTime",
    component: _abc38942,
    name: "showTime"
  }, {
    path: "/admin/addMovie",
    component: _14e774d5,
    name: "admin-addMovie"
  }, {
    path: "/admin/cost",
    component: _78a50993,
    name: "admin-cost"
  }, {
    path: "/admin/searchPaid",
    component: _da87674c,
    name: "admin-searchPaid"
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
