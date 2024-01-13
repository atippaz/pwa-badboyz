// Composables
import { defineComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import TeamView from '@/views/TeamView.vue'

const routes = [
  {
    path: "/",
    redirect: "/room",
    component: () => import("@/layouts/default/IndexLayout.vue"),
    children: [
      {
        path: "/room",
        name: "Rooms",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/RoomHome.vue"),
        alias: "index.html",
      },
      {
        path: "/spending",
        name: "Spending",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/Spending.vue"),
      },
    ],
  },
  {
    path: "/room/:roomId",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Room",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/TeamHome.vue"),
      },
      {
        path: "/team-list/:roomId",
        name: "TeamList",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/TeamList.vue"),
      },
      {
        path: "team-view/:teamId",
        name: "TeamView",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: async () => await import("@/views/TeamView.vue"),
      },
      {
        path: "/test",
        name: "Test",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: async () => await import("@/views/Test.vue"),
      },
    ],
  },
];

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
    router.push({ name: "Rooms" });
  }
})

export default router