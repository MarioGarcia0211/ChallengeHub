import { createRouter, createWebHistory } from "vue-router";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Vistas
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import UserProfile from "../views/UserProfile.vue";
import CompanyProfile from "../views/CompanyProfile.vue";

const routes = [
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  {
    path: "/user-profile",
    name: "userProfile",
    component: UserProfile,
    meta: { requiresAuth: true, role: "persona" },
  },
  {
    path: "/company-profile",
    name: "companyProfile",
    component: CompanyProfile,
    meta: { requiresAuth: true, role: "empresa" },
  },
  // Ruta raíz para redirigir si está logueado
  {
    path: "/",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protección de rutas
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const expectedRole = to.meta.role;

  // Esperar a que Firebase cargue el usuario actual (por si viene del refresh)
  const currentUser = await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });

  // Si está logueado y va a login/register, redirigirlo según su tipo
  if (currentUser && (to.path === "/login" || to.path === "/register")) {
    const userDoc = await getDoc(doc(db, "usuarios", currentUser.uid));
    const tipoUsuario = userDoc.exists() ? userDoc.data().tipoUsuario : null;
    if (tipoUsuario === "persona") return next("/user-profile");
    if (tipoUsuario === "empresa") return next("/company-profile");
    return next(); // Si no tiene tipo, lo dejamos pasar
  }

  // Si la ruta no requiere auth, dejamos pasar
  if (!requiresAuth) return next();

  // Si no está autenticado, redirigir a login
  if (!currentUser) return next("/login");

  try {
    const userDoc = await getDoc(doc(db, "usuarios", currentUser.uid));
    if (!userDoc.exists()) return next("/login");

    const userRole = userDoc.data().tipoUsuario;

    // Si el rol no coincide con la ruta, redirigir al perfil correcto
    if (expectedRole && userRole !== expectedRole) {
      return next(
        userRole === "persona" ? "/user-profile" : "/company-profile"
      );
    }

    // Todo ok
    return next();
  } catch (error) {
    console.error("Error en protección de rutas:", error);
    return next("/login");
  }
});

export default router;
