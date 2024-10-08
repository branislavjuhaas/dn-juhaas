import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Me from "./views/Me.vue";
import Skills from "./views/Skills.vue";
import Dn from "./views/Dn.vue";

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
    path: "/skills",
    name: "Skills",
    component: Skills,
  },
  {
    path: "/dn",
    name: "Dn",
    component: Dn,
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("./views/Contact.vue"),
  },
  {
    path: "/document/:id",
    name: "Document",
    component: () => import("./views/Document.vue"),
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
