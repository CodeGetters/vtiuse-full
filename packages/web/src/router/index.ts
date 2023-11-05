import { createWebHistory, createRouter } from "vue-router";

import type { RouteRecordRaw, RouterOptions, Router } from "vue-router";

import Home from "@/components/HelloWorld.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
    meta: {
      pageTitle: "Home",
    },
  },
];

const option: RouterOptions = {
  routes,
  history: createWebHistory(),
};

const router: Router = createRouter(option);

export default router;
