import { createWebHistory, createRouter } from "vue-router";
import { start, done } from "@/utils/nprogress";
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

router.beforeEach((to) => {
  start();
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_APP_NAME}`;
});

router.afterEach(() => {
  done();
});

export default router;
