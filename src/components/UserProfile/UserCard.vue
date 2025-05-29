<template>
  <div class="card shadow rounded overflow-hidden">
    <!-- Encabezado con degradado -->
    <div class="card-header-gradient"></div>

    <!-- Datos de la persona -->
    <div class="card-body">
      <div class="row g-3 align-items-center text-center text-md-start">
        <!-- Imagen -->
        <div class="col-md-2 d-flex justify-content-center">
          <img
            :src="persona.fotoPerfil"
            alt="Logo de la persona"
            class="img-fluid profile-photo"
          />
        </div>

        <!-- Datos -->
        <div class="col-md-10">
          <h4 class="fs-4 mb-1">
            {{ persona.nombres }} {{ persona.apellidos }}
          </h4>
          <p class="text-muted mb-2">
            {{ tipoDocumentoAbreviado }} {{ persona.numeroDocumento }}
          </p>

          <div
            class="d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-center justify-content-sm-start text-muted mb-3 gap-4"
          >
            <div class="d-flex align-items-center gap-1">
              <i class="bi bi-building-fill-gear icon"></i>
              <span
                v-for="(preferencia, index) in persona.preferenciasTrabajo"
                :key="'preferencia-' + index"
                class="badge custom-badge"
              >
                {{ preferencia }}
              </span>
            </div>
            <div class="d-flex align-items-center gap-1">
              <i class="bi bi-geo-alt-fill icon"></i>
              <span>{{ persona.ciudad }}</span>
            </div>
          </div>

          <div
            class="d-flex flex-wrap justify-content-center justify-content-md-end gap-2"
          >
            <router-link to="/challenge" class="btn custom-btn btn-sm">
              <i class="bi bi-trophy me-1"></i>
              Retos Disponibles
            </router-link>
            <router-link to="/vacant" class="btn custom-btn btn-sm">
              <i class="bi bi-briefcase me-1"></i>
              Ver Vacantes
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const props = defineProps({
  persona: Object,
});

const tipoDocumentoAbreviado = computed(() => {
  const mapa = {
    "Cédula de Ciudadanía": "CC",
    "Tarjeta de Identidad": "TI",
    "Tarjeta de Extranjería": "TE",
    Pasaporte: "PAS",
  };
  return mapa[props.persona.tipoDocumento];
});
</script>

<style scoped>
.card-header-gradient {
  position: relative;
  height: 40px;
  margin: 0 -1.5rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background: linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6);
}
.profile-photo {
  width: 65%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.75rem;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #f8fafc;
}

.icon {
  color: #8b5cf6;
  font-size: 1.1rem;
}

.custom-btn {
  background-color: white;
  color: #8b5cf6;
  border: 1.5px solid #8b5cf6;
  transition: all 0.3s ease;
}

.custom-btn:hover {
  background-color: #8b5cf6;
  color: white;
  text-decoration: none;
}

.custom-badge {
  background-color: #ede9fe;
  color: #8b5cf6;
  font-weight: 500;
  padding: 0.4em 0.6em;
  border-radius: 1rem;
}
</style>
