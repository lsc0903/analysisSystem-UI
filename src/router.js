import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

//异步加载
// const Home = () => import('@/views/Home.vue');
// const About = () => import('@/views/About.vue');
//admin管理后台路由
const AdminHeader = () => import('@/components/admin-common/admin-header.vue');
const AdminLeft = () => import('@/components/admin-common/admin-left.vue');
const Admin = () => import('@/components/admin-main/admin.vue');
const AdminIndex = () => import('@/components/admin-main/admin-index.vue');

const AdminCategory = () => import('@/components/admin/category/admin-category.vue');
const AdminLevel = () => import('@/components/admin/level/admin-level.vue');
const AdminSource = () => import('@/components/admin/source/admin-source.vue');
const AdminUnitype = () => import('@/components/admin/unitype/admin-unitype.vue');
const AdminUniversity = () => import('@/components/admin/university/admin-university.vue');
const AdminYearthe = () => import('@/components/admin/yearthe/admin-yearthe.vue');
const AdminUser = () => import('@/components/admin/user/admin-user.vue');
const AdminResults = () => import('@/components/admin/results/admin-results.vue');
//前端展示路由
const Show = () => import('@/components/show-main/show.vue');

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'show',
      component: Show
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
      children: [{
          path: '/adminIndex',
          name: 'adminIndex',
          component: AdminIndex
        },
        {
          path: '/adminCategory',
          name: 'adminCategory',
          component: AdminCategory
        },
        {
          path: '/adminLevel',
          name: 'adminLevel',
          component: AdminLevel
        },
        {
          path: '/adminSource',
          name: 'adminSource',
          component: AdminSource
        },
        {
          path: '/adminUnitype',
          name: 'adminUnitype',
          component: AdminUnitype
        },
        {
          path: '/adminUniversity',
          name: 'adminUniversity',
          component: AdminUniversity
        },
        {
          path: '/adminYearthe',
          name: 'adminYearthe',
          component: AdminYearthe
        },
        {
          path: '/adminUser',
          name: 'adminUser',
          component: AdminUser
        },
        {
          path: '/adminResults',
          name: 'adminResults',
          component: AdminResults
        },
      ]
    },
    {
      path: '/*',
      redirect: '/'
    },
  ]
})