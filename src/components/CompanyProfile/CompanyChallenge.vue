<template>
  <button class="btn custom-btn mb-3" @click="mostrarModal = true">
    Crear reto
  </button>

  <!-- Modal para crear o editar reto -->
  <CompanyForm
    v-if="mostrarModal"
    :visible="mostrarModal"
    :empresa="empresa"
    :reto="retoAEditar"
    @cerrar="
      mostrarModal = false;
      retoAEditar = null;
    "
    @guardado="onRetoGuardado"
  />

  <!-- Loading -->
  <div v-if="cargando" class="text-center my-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Cargando retos...</span>
    </div>
    <p class="mt-3 text-muted">Cargando retos...</p>
  </div>

  <!-- Lista de retos -->
  <div v-else-if="retos.length" class="row">
    <div
      class="col-12 col-sm-6 col-lg-4 mb-4 d-flex"
      v-for="reto in retos"
      :key="reto.id"
    >
      <CompanyChallengeCard
        :reto="reto"
        :empresa="empresa"
        @editar="editarReto"
        @eliminar="eliminarReto"
        class="w-100 h-100"
      />
    </div>
  </div>

  <!-- No hay retos -->
  <div v-else class="text-muted text-center mt-4">
    No hay retos registrados aún.
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import CompanyForm from "./CompanyForm.vue";
import CompanyChallengeCard from "./CompanyChallengeCard.vue";
import { obtenerRetosPorEmpresa } from "../../services/challengeServices";

const props = defineProps({
  empresa: Object,
});

const retos = ref([]);
const mostrarModal = ref(false);
const cargando = ref(true);
const retoAEditar = ref(null);

// Recargar lista tras guardar reto
const onRetoGuardado = async () => {
  await cargarRetos();
  mostrarModal.value = false;
  retoAEditar.value = null;
};

// Función para cargar retos
const cargarRetos = async () => {
  cargando.value = true;
  if (props.empresa?.uid) {
    try {
      retos.value = await obtenerRetosPorEmpresa(props.empresa.uid);
    } catch (error) {
      console.error("Error al cargar retos:", error);
    } finally {
      cargando.value = false;
    }
  } else {
    cargando.value = false;
  }
};

// Acciones de tarjeta
const editarReto = (reto) => {
  console.log("Editar reto", reto);
  retoAEditar.value = reto;
  mostrarModal.value = true;
};

const eliminarReto = (reto) => {
  if (confirm(`¿Estás seguro de eliminar el reto "${reto.nombreReto}"?`)) {
    console.log("Reto eliminado:", reto);
    // Aquí iría lógica real de eliminación
  }
};

// Cargar retos cuando cambia empresa
watch(
  () => props.empresa,
  async (nuevaEmpresa) => {
    if (nuevaEmpresa?.uid) {
      await cargarRetos();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.custom-btn {
  background-color: #8b5cf6;
  border: none;
  color: white;
  transition: background-color 0.2s ease;
}

.custom-btn:hover {
  background-color: #7c3aed;
  color: white;
}
</style>
