import Vue from 'vue'
import Router from 'vue-router'

/* 安装路由 */
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
// 每个路由映射一个组件
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/homepage',
    children: [{
      path: 'homepage',
      name: 'Homepage',
      component: () => import('@/views/homepage/index'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // auth-redirect在哪里使用到？
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/categoryManager',
    component: Layout,
    children: [
      {
        path: 'category',
        component: () => import('@/views/categoryManager/category'),
        name: 'Category',
        meta: { title: '品类管理', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/goodManager',
    component: Layout,
    meta: {
      title: '商品管理',
      icon: 'lock',
      roles: ['admin']
    },
    children: [
      {
        path: 'good',
        component: () => import('@/views/goodManager/good'),
        name: 'Good',
        meta: { title: '商品管理', icon: 'icon', noCache: true }
      },
      {
        path: 'weight',
        component: () => import('@/views/goodManager/weight'),
        name: 'Weight',
        meta: { title: '重量配置', icon: 'icon', noCache: true }
      },
      {
        path: 'price',
        component: () => import('@/views/goodManager/price'),
        name: 'Price',
        meta: { title: '价格配置', icon: 'icon', noCache: true }
      },
      {
        path: 'sku',
        component: () => import('@/views/goodManager/sku'),
        name: 'Sku',
        meta: { title: '库存管理', icon: 'icon', noCache: true }
      },
      {
        path: 'up-and-off',
        component: () => import('@/views/goodManager/upAndOf'),
        name: 'UpAndOff',
        meta: { title: '商品上下架管理', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/ticket',
    component: Layout,
    meta: {
      title: '订单管理',
      icon: 'lock',
      roles: ['admin']
    },
    children: [
      {
        path: 'ticketList',
        component: () => import('@/views/ticket/ticketList'),
        name: 'TicketList',
        meta: { title: '订单列表', icon: 'icon', noCache: true }
      },
      {
        path: 'returnTickets',
        component: () => import('@/views/ticket/returnTickets'),
        name: 'ReturnTickets',
        meta: { title: '退货订单', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: '图标', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    meta: {
      title: '权限配置',
      icon: 'lock',
      roles: ['admin']
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'Role',
        meta: { title: '角色配置', icon: 'icon', noCache: true }
      },
      {
        path: 'user',
        component: () => import('@/views/permission/user'),
        name: 'User',
        meta: { title: '用户配置', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  {
    path: '/myaccount',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/myAccount/index'),
        name: 'myAccount',
        // meta里的是信息，关于路由配置请看vue官方文档router介绍
        meta: { title: '账户设置', icon: 'clipboard' }
      }
    ]

  }
  // 404 page must be placed at the end !!!
]

// 创建 router 实例 使用html5的history模式
const createRouter = () => new Router({
  // 滚动设置
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 一个重置路由的方法，切换用户后，或者退出时清除动态加载的路由
}

export default router
