<template>
  <div class="card shadow rounded overflow-hidden">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <img
          :src="empresa.logo"
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
              <button class="dropdown-item" @click="$emit('editar', reto)">
                Editar
              </button>
            </li>
            <li>
              <button
                class="dropdown-item text-danger"
                @click="$emit('eliminar', reto)"
              >
                Eliminar
              </button>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <p class="text-truncated">{{ reto.descripcion }}</p>

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

      <div class="text-end">
        Estado: <span class="badge bg-success">{{ reto.estado }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  reto: Object,
  empresa: Object,
});

defineEmits(["editar", "eliminar"]);
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
</style>
