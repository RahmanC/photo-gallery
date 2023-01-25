import { createRouter, createWebHistory } from "vue-router";

import dashboardView from "../pages/master/dashboardView";
import homeView from "../pages/homeView";
import profileView from "../pages/profileView";

const routes = [
  {
    name: "Dashboard",
    path: "/",
    component: dashboardView,
  },
  {
    name: "Home",
    path: "/home",
    component: homeView,
  },
  {
    name: "Profile",
    path: "/profile",
    component: profileView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
