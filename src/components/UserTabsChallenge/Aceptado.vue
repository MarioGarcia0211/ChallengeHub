<template>
  <div>
    <h5>Retos Aceptados</h5>

    <!-- Cargando -->
    <div v-if="loading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Contenido -->
    <div v-else>
      <div v-if="retos.length > 0" class="row">
        <div
          class="col-12 col-sm-6 col-lg-4 mb-4"
          v-for="reto in retos"
          :key="reto.id"
        >
          <UserMyChallengeCard :reto="reto" />
        </div>
      </div>
      <p v-else>No hay retos registrados.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { obtenerRetosPorPersonaYEstado } from "../../services/challengeServices";
import UserMyChallengeCard from "../UserProfile/UserMyChallengeCard.vue";

const props = defineProps({
  persona: Object,
});

const retos = ref([]);
const loading = ref(true);

// Esperar a que persona esté disponible
watch(
  () => props.persona,
  async (nuevaPersona) => {
    if (nuevaPersona?.uid) {
      loading.value = true;
      try {
        const estado = "aceptado";
        retos.value = await obtenerRetosPorPersonaYEstado(
          nuevaPersona.uid,
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
