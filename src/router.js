import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

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
const ShowHeader = () => import('@/components/show-comon/show-header.vue');
const ShowIndex = () => import('@/components/show/show-index.vue');
const ShowSearch = () => import('@/components/show/show-search.vue');
const ShowContrast = () => import('@/components/show/show-contrast.vue');
const ShowUniversityRanking = () => import('@/components/show/show-university-ranking.vue');
const ShowDetails = () => import('@/components/show/show-details.vue');
const Login = () => import('@/components/login.vue');

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'show',
      component: Show,
      redirect: 'showIndex',
      children: [{
          path: '/',
          name: 'showIndex',
          component: ShowIndex
        },
        {
          path: '/showSearch',
          name: 'showSearch',
          component: ShowSearch
        },
        {
          path: '/showContrast',
          name: 'showContrast',
          component: ShowContrast
        },
        {
          path: '/showUniversityRanking',
          name: 'showUniversityRanking',
          component: ShowUniversityRanking
        },
        {
          path: '/showDetails/:id',
          name: 'showDetails',
          component: ShowDetails
        },
      ]
    },
    {
      path: '/showHeader',
      name: 'showHeader',
      component: ShowHeader
    },
    {
      path: '/adminHeader',
      name: 'adminHeader',
      component: AdminHeader,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/adminLeft',
      name: 'adminLeft',
      component: AdminLeft,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: 'adminIndex',
      meta: {
        requiresAuth: true
      },
      children: [{
          path: '/adminIndex',
          name: 'adminIndex',
          component: AdminIndex,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/adminCategory',
          name: 'adminCategory',
          component: AdminCategory,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/adminLevel',
          name: 'adminLevel',
          component: AdminLevel,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/adminSource',
          name: 'adminSource',
          component: AdminSource,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/adminUnitype',
          name: 'adminUnitype',
          component: AdminUnitype,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/adminUniversity',
          name: 'adminUniversity',
          component: AdminUniversity,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/adminYearthe',
          name: 'adminYearthe',
          component: AdminYearthe,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/adminUser',
          name: 'adminUser',
          component: AdminUser,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/adminResults',
          name: 'adminResults',
          component: AdminResults,
          meta: {
            requiresAuth: true
          }
        },
      ]
    },
    {
      path: '/*',
      redirect: '/'
    },
  ]
})


// 页面刷新时，重新赋值有没登录
if (window.localStorage.getItem('userName')) {
  store.commit('SAVE_USERINFO', {
    userName: window.localStorage.getItem("userName"),
    name: window.localStorage.getItem("name")
  });
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) { // 判断该路由是否需要登录权限
    if (store.state.userName != "" && store.state.name != "") { // 通过vuex 如果登录
      next();
    } else {
      next({
        path: '/login',
      })
    }
  } else {
    next();
  }
});

export default router;