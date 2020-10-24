export { default as Logo } from '../..\\components\\Logo.vue'
export { default as Sidebar } from '../..\\components\\sidebar.vue'
export { default as Topbar } from '../..\\components\\topbar.vue'

export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components_Logo" */).then(c => c.default || c)
export const LazySidebar = import('../..\\components\\sidebar.vue' /* webpackChunkName: "components_sidebar" */).then(c => c.default || c)
export const LazyTopbar = import('../..\\components\\topbar.vue' /* webpackChunkName: "components_topbar" */).then(c => c.default || c)
