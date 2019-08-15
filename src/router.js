import Vue from 'vue'
import Router from 'vue-router'
import TabBar from './views/TabBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: TabBar,
      children: [
        { path: '/', name: 'home', component: () => import('./views/Home') },
        { path: '/mine', name: 'mine', component: () => import('./views/Mine') }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/Search')
    },
    {
      path: '/search-result',
      name: 'search-result',
      component: () => import('@/views/Search/search-result')
    },
    {
      path: '/article/:art_id',
      name: 'article',
      component: () => import('./views/详情页')
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: () => import('./views/个人编辑')
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('./views/Mine/components/feedback.vue')
    }
  ]
})
