<template>
  <div>
    <h5>Candidatos en revisión</h5>
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
import { ref, watch, onMounted, onUnmounted } from "vue";
import { obtenerPostulacionRetoPorEmpresa } from "../../services/candidateServices.js";
import CompanyCandidateTable from "../CompanyProfile/CompanyCandidateTable.vue";

const props = defineProps({
  empresa: Object,
});

const retos = ref([]);
const loading = ref(true);
let unsubscribe = null;

watch(
  () => props.empresa,
  async (nuevaEmpresa) => {
    if (nuevaEmpresa?.uid) {
      loading.value = true;

      if (unsubscribe) unsubscribe();

      unsubscribe = await obtenerPostulacionRetoPorEmpresa(
        nuevaEmpresa.uid,
        "en revision",
        (nuevasPostulaciones) => {
          retos.value =
            typeof nuevasPostulaciones === "function"
              ? nuevasPostulaciones(retos.value)
              : nuevasPostulaciones;

          loading.value = false;
          console.log("Retos pendientes:", retos.value);
        }
      );
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});
</script>
<style></style>
