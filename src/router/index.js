import { createRouter, createWebHistory } from "vue-router";

import dashboardView from "../pages/master/dashboardView";
import feedView from "../pages/feedView";

const routes = [
  {
    name: "Dashboard",
    path: "/",
    component: dashboardView,
    children: [
      {
        name: "Edit",
        path: "/edit",
        component: feedView,
      },
      {
        name: "Feed",
        path: "/feed",
        component: feedView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
