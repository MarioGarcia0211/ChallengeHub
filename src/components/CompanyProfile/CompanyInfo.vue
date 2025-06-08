<template>
  <div class="row g-4">
    <div class="col-md-4">
      <!-- Información -->
      <div class="card custom-card mb-3">
        <div class="card-body">
          <h6 class="section-title">INFORMACIÓN</h6>
          <p class="mb-2">
            <i class="bi bi-flag-fill me-2 icon"></i>
            <strong>País:</strong> {{ empresa.pais || "No especificado" }}
          </p>

          <!-- Contactos -->
          <h6 class="section-title mt-4">CONTACTOS</h6>
          <p class="mb-2">
            <i class="bi bi-globe2 me-2 icon"></i>
            <strong>Sitio web:</strong>
            {{ empresa.paginaWeb || "No disponible" }}
          </p>
          <p class="mb-2">
            <i class="bi bi-telephone-fill me-2 icon"></i>
            <strong>Teléfono:</strong> {{ empresa.whatsapp || "No disponible" }}
          </p>
          <p class="mb-0">
            <i class="bi bi-envelope-fill me-2 icon"></i>
            <strong>Correo:</strong> {{ empresa.correo || "No disponible" }}
          </p>
        </div>
      </div>

      <!-- Descripción -->
      <div class="card custom-card">
        <div class="card-body">
          <h6 class="section-title">DESCRIPCIÓN</h6>
          <p class="mb-0">
            {{ empresa.descripcion || "Sin descripción proporcionada." }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  empresa: Object,
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
</style>
