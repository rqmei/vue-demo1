import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login1 from '@/views/login/index'
import Layout from '@/views/layout/layout'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/user',
      name: 'User',
      component: () => import('@/views/user/User.vue'),
      redirect: '/plan/current',
      children: [
        {
          path: '/hello',
          name: 'HelloWorld',
          component: HelloWorld,
          hidden: true
        }, {
          path: '/plan/current',
          name: 'CurrentPlan',
          component: () => import('../views/user/plan/current/CurrentPlan')
        }, {
          path: '/plan/all',
          name: 'AllPlan',
          component: () => import('../views/user/plan/all/AllPlan')
        }
      ]
    },
    {
      path: '/login1',
      name: 'Login1',
      component: Login1,
      hidden: true
    }, {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login'),
      hidden: true
    }, {
      path: '/lessons',
      name: '课件管理',
      component: Layout,
      meta: {title: 'Home', icon: 'service', role: ['admin']},
      children: [
        {
          path: 'list',
          name: '课件列表',
          meta: {role: ['admin']},
          component: () => import('@/views/lesson-manager/lesson-list/LessonList.vue')
        }
      ]
    },
    {
      path: '/train',
      name: '培训管理',
      component: Layout,
      redirect: 'plan/list',
      children: [
        {
          path: 'plan/list',
          name: '计划管理',
          component: () => import('@/views/train-manager/PlanManager.vue')
        },
        {
          path: 'plan/add',
          name: '新增计划',
          component: () => import('@/views/train-manager/add-plan/AddPlan.vue'),
          hidden: true,
          meta: {role: ['admin']}
        },
        {
          path: 'plan/copy',
          name: '复制计划',
          component: () => import('@/views/train-manager/add-plan/AddPlan.vue'),
          hidden: true,
          meta: {role: ['admin']}
        }
      ]
    }
  ]
})
