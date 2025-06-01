<template>
  <div
    @click="abrirModal"
    :title="'Haz clic para ver más detalles del reto'"
    class="card shadow rounded overflow-hidden h-100 d-flex flex-column"
  >
    <div class="card-body d-flex flex-column h-100">
      <div class="d-flex align-items-center mb-3">
        <img
          :src="reto.empresa.logo"
          alt="Logo de la empresa"
          class="img-thumbnail me-3"
          style="width: 60px; height: 60px; object-fit: cover"
        />
        <div class="flex-grow-1">
          <h5 class="mb-1">{{ reto.nombreReto }}</h5>

          <div class="mb-2 d-flex align-items-center">
            <i class="bi bi-cpu me-2"></i>
            <div>
              <span
                v-for="(prog, index) in reto.programacion.slice(0, 3)"
                :key="'prog-' + index"
                class="badge me-1 soft-badge"
              >
                {{ prog }}
              </span>
              <span
                v-if="reto.programacion.length > 3"
                class="badge soft-badge extra-badge"
              >
                +{{ reto.programacion.length - 3 }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p class="text-truncated descripcion-truncada">{{ reto.descripcion }}</p>

      <div class="mb-2 d-flex align-items-center">
        <i class="bi bi-display me-2"></i>
        <div>
          <span
            v-for="(tec, index) in reto.tecnologias.slice(0, 3)"
            :key="'tec-' + index"
            class="badge me-1 soft-badge"
          >
            {{ tec }}
          </span>
          <span
            v-if="reto.tecnologias.length > 3"
            class="badge soft-badge extra-badge"
          >
            +{{ reto.tecnologias.length - 3 }}
          </span>
        </div>
      </div>

      <div class="mb-2 d-flex align-items-center">
        <i class="bi bi-code-slash me-2"></i>
        <div>
          <span
            v-for="(lang, index) in reto.lenguajes.slice(0, 3)"
            :key="'lang-' + index"
            class="badge me-1 soft-badge"
          >
            {{ lang }}
          </span>
          <span
            v-if="reto.lenguajes.length > 3"
            class="badge soft-badge extra-badge"
          >
            +{{ reto.lenguajes.length - 3 }}
          </span>
        </div>
      </div>

      <div class="mt-auto d-flex justify-content-between align-items-center">
        <div>
          Estado:
          <span class="badge" :class="estadoClase(reto.estadoParticipacion)">
            {{ reto.estadoParticipacion }}
          </span>
        </div>
        <div>
          <span
            class="badge bg-primary"
            title="Estás participando en este reto"
          >
            Participando
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

const mostrarModal = ref(false);

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  reto: Object,
});

function abrirModal() {
  console.log("Debe abrirse el modal");
  mostrarModal.value = true;
}

function estadoClase(estado) {
  switch (estado.toLowerCase()) {
    case "pendiente":
      return "bg-warning-custom text-white";
    case "en revisión":
      return "bg-review-custom text-white";
    case "en proceso":
      return "bg-process-custom text-white";
    case "aceptado":
      return "bg-accept-custom text-white";
    case "rechazado":
      return "bg-reject-custom text-white";
    default:
      return "bg-secondary text-white";
  }
}
</script>

<style scoped>
.soft-badge {
  background-color: #f1f5f9;
  color: #334155;
  padding: 0.35em 0.6em;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
}

.extra-badge {
  background-color: #ede9fe;
  color: #6b21a8;
}

.descripcion-truncada {
  min-height: 72px; /* Ajusta según diseño */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* número de líneas visibles */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.card {
  cursor: pointer;
}

.card:hover {
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
}

.card:active {
  transform: scale(0.97);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.bg-warning-custom {
  background-color: #f97316 !important;
}

.bg-review-custom {
  background-color: #06b6d4 !important;
}

.bg-process-custom {
  background-color: #8b5cf6 !important;
}

.bg-accept-custom {
  background-color: #22c55e !important;
}

.bg-reject-custom {
  background-color: #374151 !important;
}
</style>
