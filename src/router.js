import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:pathMatch(.*)*", // 404
    name: "404",
    component: () => import("./views/Error.vue"),
    props: { code: 404 },
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
