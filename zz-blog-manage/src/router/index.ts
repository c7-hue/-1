import { createWebHistory, createRouter } from 'vue-router'

import IndexView from '../views/IndexView.vue'
import { isRegisterApi } from '../api'

const routes = [
  {
    path: '/',
    redirect: '/overview',
    component: IndexView,
    children: [
      {
        path: '/overview',
        component: () => import('../views/OverView.vue'),
      },
       {
        path: '/localfile',
        component: () => import('../views/FileView.vue'),
      },
      {
        path: '/article',
        component: () => import('../views/ArticleView.vue'),
      },
      {
        path: '/gallery',
        component: () => import('../views/GalleryView.vue'),
      },
      {
        path: '/diary',
        component: () => import('../views/DiaryView.vue'),
      },
      {
        path: '/install',
        component: () => import('../views/InstallView.vue'),
      },
      {
        path: '/login',
        component: () => import('../views/Login.vue'),
      },
      {
        path: '/register',  
        component: () => import('../views/Register.vue'),
      },
    ],
  },
      {
        path: '/editgallery',
        component: () => import('../views/EditGallery.vue'),
      },
      {
        path: '/editdiary',
        component: () => import('../views/EditDiary.vue'),
      },
      {
        path: '/editarticle',
        component: () => import('../views/EditArticle.vue'),
      },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

//在路由请求之前
router.beforeEach((to, from, next) => {
  if(to.matched.length === 0) {
    //地址错误发生跳转
    from.name ? next({
      name: from.name
    }) : next('/')
  } else {
    // 检查是否是登录或注册页面
    if (to.path === '/login' || to.path === '/register') {
      next();
    } else {
      // 先检查用户是否已注册
      isRegisterApi({}).then((res: any) => {
        if (res.code === 401) {
          // 未注册，跳转到注册页面
          next('/register');
        } else {
          // 已注册，检查用户是否已登录
          const userStr = localStorage.getItem('user');
          if (userStr) {
            try {
              const user = JSON.parse(userStr);
              if (user.token) {
                // 已登录，直接跳转
                next();
                return;
              }
            } catch (e) {
              console.error('解析用户信息失败:', e);
            }
          }
          // 未登录，跳转到登录页面
          next('/login');
        }
      }).catch(() => {
        // 检查失败，跳转到登录页面
        next('/login');
      });
    }
  }
})

export default router;