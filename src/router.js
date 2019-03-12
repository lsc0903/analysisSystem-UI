import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import About from './views/About.vue'

Vue.use(Router)

//异步加载
const Home = () => import('@/views/Home.vue')
const About = () => import('@/views/About.vue')
//admin管理后台路由
const AdminHeader = () => import('@/components/admin-common/admin-header.vue')
const AdminLeft = () => import('@/components/admin-common/admin-left.vue')
const Admin = () => import('@/components/admin-main/admin.vue')
const AdminIndex = () => import('@/components/admin/admin-index.vue')
const AdminCategory = () => import('@/components/admin/category/admin-category.vue')
const AdminLevel = () => import('@/components/admin/level/admin-level.vue')
const AdminSource = () => import('@/components/admin/source/admin-source.vue')
const AdminUnitype = () => import('@/components/admin/unitype/admin-unitype.vue')
const AdminUniversity = () => import('@/components/admin/university/admin-university.vue')
const AdminYearthe = () => import('@/components/admin/yearthe/admin-yearthe.vue')
const AdminUser = () => import('@/components/admin/user/admin-user.vue')
const AdminResults = () => import('@/components/admin/results/admin-results.vue')
//前端展示路由
const Show = () => import('@/components/show-main/show.vue')


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/show',
      name: 'show',
      component: Show
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About

    },
    {
      path: '/adminHeader',
      name: 'adminHeader',
      component: AdminHeader
    },
    {
      path: '/adminLeft',
      name: 'adminLeft',
      component: AdminLeft
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: 'adminIndex',
      children: [
        // 后台首页
        {
          path: '/adminIndex',
          name: 'adminIndex',
          component: AdminIndex
        },
        //作品类别
        {
          path: '/adminCategory',
          name: 'adminCategory',
          component: AdminCategory
        },
        //获奖等级
        {
          path: '/adminLevel',
          name: 'adminLevel',
          component: AdminLevel
        },
        //作品来源
        {
          path: '/adminSource',
          name: 'adminSource',
          component: AdminSource
        },
        //高校类别
        {
          path: '/adminUnitype',
          name: 'adminUnitype',
          component: AdminUnitype
        },
        //高校信息
        {
          path: '/adminUniversity',
          name: 'adminUniversity',
          component: AdminUniversity
        },
        //年份-届
        {
          path: '/adminYearthe',
          name: 'adminYearthe',
          component: AdminYearthe
        },
        //用户信息
        {
          path: '/adminUser',
          name: 'adminUser',
          component: AdminUser
        },
        //成果信息
        {
          path: '/adminResults',
          name: 'adminResults',
          component: AdminResults
        },
      ]
    },
    //没有在上面的路由中匹配到就跳转到redirect指定的路由去
    {
      path: '/*',
      redirect: '/'
    },
  ]
})