import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Me from "./views/Me.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/me",
    name: "Me",
    component: Me,
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("./views/Contact.vue"),
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
