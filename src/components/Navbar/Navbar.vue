<template>
  <nav class="navbar navbar-expand-lg sticky-top shadow">
    <div
      class="container-fluid d-flex justify-content-between align-items-center"
    >
      <router-link class="navbar-brand mb-0 h1 titulo-navbar" to="/inicio">
        ChallengeHub
      </router-link>

      <div v-if="usuario">
        <button class="btn btn-outline-danger btn-sm" @click="cerrarSesion">
          Cerrar sesión
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const usuario = ref(null);
const router = useRouter();
const auth = getAuth();

// Detectar usuario autenticado
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    usuario.value = user;
    console.log("Datos del usuario:", user);
  });
});

// Cerrar sesión
const cerrarSesion = async () => {
  try {
    await signOut(auth);
    router.push("/login");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
</script>

<style scoped>
.navbar {
  min-height: 70px;
  background-color: white;
}

.navbar-brand {
  font-weight: bold;
}
</style>
