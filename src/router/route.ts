const Search = () => import('@/views/home/search/Search.vue')

export const route: Array<any> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home', // 主页
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    children: [{
      path: '/home',
      redirect: '/home/discovery'
    }, {
      path: '/home/discovery', // 导航 -- 发现
      name: 'Discovery',
      component: () => import('@/views/home/discovery/index.vue')
    }, {
      // 搜索页
      path: '/home/search',
      name: 'Search',
      component: Search
    }, {
      path: '/home/blog', // 导航 -- 博客
      name: 'Blog',
      component: () => import('@/views/home/blog/index.vue')
    }, {
      path: '/home/my', // 导航 -- 我的
      name: 'My',
      component: () => import('@/views/home/my/index.vue')
    }, {
      path: '/home/focus', // 导航 -- 关注
      name: 'Focus',
      component: () => import('@/views/home/focus/index.vue')
    }, {
      path: '/home/yuncun', // 导航 -- 云村
      name: 'Yuncun',
      component: () => import('@/views/home/yuncun/index.vue')
    }]
  },
  {
    path: '/login', // 登录页
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/register', // 注册页
    name: 'Register',
    component: () => import('@/views/register/index.vue')
  }
]
