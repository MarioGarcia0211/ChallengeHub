<template>
  <div class="card shadow rounded overflow-hidden h-100 d-flex flex-column">
    <div class="card-body d-flex flex-column h-100">
      <div class="d-flex align-items-center mb-3">
        <img
          :src="empresa.logo"
          alt="Logo de la empresa"
          class="img-thumbnail me-3"
          style="width: 60px; height: 60px; object-fit: cover"
        />
        <div class="flex-grow-1">
          <h5 class="mb-1">{{ vacante.nombreVacante }}</h5>

          <div class="mb-2 d-flex align-items-center">
            <i class="bi bi-cpu me-2"></i>
            <div>
              <span
                v-for="(prog, index) in vacante.programacion.slice(0, 3)"
                :key="'prog-' + index"
                class="badge me-1 soft-badge"
              >
                {{ prog }}
              </span>
              <span
                v-if="vacante.programacion.length > 3"
                class="badge soft-badge extra-badge"
              >
                +{{ vacante.programacion.length - 3 }}
              </span>
            </div>
          </div>
        </div>

        <div class="dropdown">
          <button
            class="btn btn-sm"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-three-dots-vertical"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <button class="dropdown-item" @click="$emit('editar', vacante)">
                Editar
              </button>
            </li>
            <li>
              <button
                class="dropdown-item text-danger"
                @click="$emit('eliminar', vacante)"
              >
                Eliminar
              </button>
            </li>
          </ul>
        </div>
      </div>

      <p class="text-truncated descripcion-truncada">
        {{ vacante.descripcion }}
      </p>

      <div class="mb-2 d-flex align-items-center">
        <i class="bi bi-display me-2"></i>
        <div>
          <span
            v-for="(tec, index) in vacante.tecnologias.slice(0, 3)"
            :key="'tec-' + index"
            class="badge me-1 soft-badge"
          >
            {{ tec }}
          </span>
          <span
            v-if="vacante.tecnologias.length > 3"
            class="badge soft-badge extra-badge"
          >
            +{{ vacante.tecnologias.length - 3 }}
          </span>
        </div>
      </div>

      <div class="mb-2 d-flex align-items-center">
        <i class="bi bi-code-slash me-2"></i>
        <div>
          <span
            v-for="(lang, index) in vacante.lenguajes.slice(0, 3)"
            :key="'lang-' + index"
            class="badge me-1 soft-badge"
          >
            {{ lang }}
          </span>
          <span
            v-if="vacante.lenguajes.length > 3"
            class="badge soft-badge extra-badge"
          >
            +{{ vacante.lenguajes.length - 3 }}
          </span>
        </div>
      </div>

      <div class="mt-auto text-end">
        Estado:
        <span
          class="badge"
          :class="vacante.estado === 'abierto' ? 'bg-success' : 'bg-danger'"
        >
          {{ vacante.estado }}
        </span>
      </div>

      <hr />

      <div class="mt-auto text-start">
        Fecha de creación: {{ formatearFecha(vacante.fechaRegistro) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
defineProps({
  vacante: Object,
  empresa: Object,
});

defineEmits(["editar", "eliminar"]);

const mostrarModal = ref(false);

const formatearFecha = (timestamp) => {
  if (!timestamp?.toDate) return "Fecha no válida";
  const fecha = timestamp.toDate();
  return fecha.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
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
</style>
