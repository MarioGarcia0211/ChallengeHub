<template>
  <Navbar />
  <div class="cont-fluid mt-3">
    <!-- User Card -->
    <UserCard :persona="persona" />

    <!-- UserTabs -->
    <UserTabs />

    <!-- Contenido dinámico -->
    <div class="mt-3">
      <router-view :persona="persona" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { obtenerDatosUsuario } from "../services/userServices";

import Navbar from "../components/Navbar/Navbar.vue";
import UserCard from "../components/UserProfile/UserCard.vue";
import UserTabs from "../components/UserProfile/UserTabs.vue";

const persona = ref({
  tipoUsuario: "",
  nombres: "",
  apellidos: "",
  tipoDocumento: "",
  numeroDocumento: "",
  fotoPerfil: "",
  ciudad: "",
  pais: "",
  descripcion: "",
  tecnologias: [],
  habilidades: [],
  recursos: [],
  preferenciasTrabajo: [],
  hojaDeVida: "",
  whatsapp: "",
  correo: "",
  contrasena: "",
});
const loading = ref(true);

onMounted(async () => {
  try {
    persona.value = await obtenerDatosUsuario();
    console.log("Datos del persona:", persona.value);
  } catch (error) {
    console.error("Error cargando persona:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped></style>
