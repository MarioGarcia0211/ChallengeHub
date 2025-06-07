<template>
  <div>
    <h5>Candidatos Pendientes</h5>
    <!-- Cargando -->
    <div v-if="loading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Contenido -->
    <div v-else>
      <div
        v-if="retos && retos.length"
        class="contenedor-card my-4 shadow p-4 rounded"
      >
        <CompanyCandidateTable :retos="retos" />
      </div>
      <p v-else>No hay candidatos registrados.</p>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { obtenerPostulacionRetoPorEmpresa } from "../../services/candidateServices.js";
import CompanyCandidateTable from "../CompanyProfile/CompanyCandidateTable.vue";

const props = defineProps({
  empresa: Object,
});

const retos = ref([]);
const loading = ref(true);

watch(
  () => props.empresa,
  async (nuevaEmpresa) => {
    if (nuevaEmpresa?.uid) {
      loading.value = true;
      try {
        const estado = "pendiente";
        retos.value = await obtenerPostulacionRetoPorEmpresa(
          nuevaEmpresa.uid,
          estado
        );
        console.log("Retos:", retos.value);
      } catch (error) {
        console.error("Error al obtener retos:", error);
      } finally {
        loading.value = false;
      }
    }
  },
  { immediate: true }
);
</script>
<style></style>
