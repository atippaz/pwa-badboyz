// Composables
import { defineComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import TeamView from '@/views/TeamView.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'HomePage',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
alias:'index.html',
      },
      {
        path: 'team-view/:roomId',
        name: 'TeamListPage',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: async () => await import('@/views/TeamView.vue'),
      },
      {
        path: 'counter-view',
        name: 'CounterPage',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/CounterView.vue'),
      },
      {
        path: 'test-system',
        name: 'TestPage',
        component: () => import('@/views/TestView.vue'),
      },
      {
        path: 'room-list',
        name: 'RoomListPage',
        component: () => import('@/views/RoomList.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.onError((error, to) => {
  if (
    error.message.includes('Failed to fetch dynamically imported module') ||
    error.message.includes('Importing a module script failed')
  ) {
    console.log(error)
    router.push({ name: 'HomePage' })
  }
})

export default router