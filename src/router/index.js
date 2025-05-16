import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Inicio from "../views/Inicio.vue";

const routes = [
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "", component: Register },
  {path: "/inicio", name: "", component: Inicio}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
