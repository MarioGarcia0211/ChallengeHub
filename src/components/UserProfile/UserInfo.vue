<template>
  <div class="row g-4">
    <div class="col-md-4">
      <!-- Información -->
      <div class="card custom-card mb-3">
        <div class="card-body">
          <h6 class="section-title">INFORMACIÓN</h6>
          <p class="mb-2">
            <i class="bi bi-flag-fill me-2 icon"></i>
            <strong>País:</strong> {{ persona.pais || "No especificado" }}
          </p>

          <p class="mb-2">
            <i class="bi bi-lightbulb-fill me-2 icon"></i>
            <strong>Habilidades:</strong>
            <span v-if="persona.habilidades?.length" class="d-block mt-1">
              <span
                v-for="(habilidad, index) in persona.habilidades"
                :key="'hab-' + index"
                class="badge rounded-pill custom-badge me-1 mb-1"
              >
                {{ habilidad }}
              </span>
            </span>
            <span v-else>No especificado</span>
          </p>

          <p class="mb-2">
            <i class="bi bi-code-slash me-2 icon"></i>
            <strong>Programación:</strong>
            <span v-if="persona.tecnologias?.length" class="d-block mt-1">
              <span
                v-for="(tecnologia, index) in persona.tecnologias"
                :key="'tec-' + index"
                class="badge rounded-pill custom-badge me-1 mb-1"
              >
                {{ tecnologia }}
              </span>
            </span>
            <span v-else>No especificado</span>
          </p>

          <!-- Contactos -->
          <h6 class="section-title mt-4">CONTACTOS</h6>
          <p class="mb-2">
            <i class="bi bi-telephone-fill me-2 icon"></i>
            <strong>Teléfono:</strong> {{ persona.whatsapp || "No disponible" }}
          </p>
          <p class="mb-0">
            <i class="bi bi-envelope-fill me-2 icon"></i>
            <strong>Correo:</strong> {{ persona.correo || "No disponible" }}
          </p>
        </div>
      </div>

      <!-- Descripción -->
      <div class="card custom-card">
        <div class="card-body">
          <h6 class="section-title">DESCRIPCIÓN</h6>
          <p class="mb-0">
            {{ persona.descripcion || "Sin descripción proporcionada." }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  persona: Object,
});
</script>

<style scoped>
strong {
  color: #8b5cf6;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af; /* gris suave */
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.icon {
  color: #8b5cf6;
  font-size: 1.1rem;
}

.custom-badge {
  background-color: #ede9fe;
  color: #8b5cf6;
  font-weight: 500;
}
</style>
