<template>
  <Navbar />
  <div class="cont-fluid mt-3">
    <button class="btn btn-secondary">
      <i class="bi bi-arrow-left"></i> Regresar
    </button>
    <div v-if="loading">Cargando datos...</div>

    <div v-else>
      <h3 class="mt-4">Retos disponibles</h3>
      <div v-if="retos.length > 0" class="row">
        <div
          class="col-12 col-sm-6 col-lg-4 mb-4 d-flex"
          v-for="reto in retos"
          :key="reto.id"
        >
          <ChallengeCard :reto="reto" class="w-100 h-100" />
        </div>
      </div>
      <!-- <ul v-if="retos.length > 0">
        <li v-for="reto in retos" :key="reto.id" class="mb-2">
          <strong>{{ reto.titulo }}</strong
          ><br />
          {{ reto.descripcion }}
        </li>
      </ul> -->
      <p v-else>No hay retos disponibles en este momento.</p>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { obtenerDatosUsuario } from "../services/userServices";
import {
  obtenerTodosLosRetos,
  obtenerRetosConEmpresa,
} from "../services/challengeServices";
import ChallengeCard from "../components/Challenge/ChallengeCard.vue";

import Navbar from "../components/Navbar/Navbar.vue";
import Footer from "../components/Footer/Footer.vue";

const persona = ref({});
const retos = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    // Obtener datos del usuario
    persona.value = await obtenerDatosUsuario();
    console.log("Datos del usuario:", persona.value);

    // Obtener todos los retos disponibles
    // retos.value = await obtenerTodosLosRetos();
    retos.value = await obtenerRetosConEmpresa();
    console.log("Retos disponibles:", retos.value);
  } catch (error) {
    console.error("Error al cargar datos:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Puedes agregar estilos personalizados si lo deseas */
</style>
