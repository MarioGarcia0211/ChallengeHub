<template>
  <div class="card shadow rounded overflow-hidden">
    <!-- Encabezado con degradado -->
    <div class="card-header-gradient"></div>

    <!-- Datos de la empresa -->
    <div class="card-body">
      <div class="row g-3 align-items-center text-center text-md-start">
        <!-- Imagen -->
        <div class="col-md-2 d-flex justify-content-center">
          <img
            :src="empresa.logo"
            alt="Logo de la empresa"
            class="img-fluid profile-photo"
          />
        </div>

        <!-- Datos -->
        <div class="col-md-10">
          <h4 class="fs-4 mb-1">{{ empresa.nombreEmpresa }}</h4>
          <p class="text-muted mb-2">NIT {{ empresa.nit }}</p>

          <div
            class="d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-center justify-content-sm-start text-muted mb-3 gap-4"
          >
            <div class="d-flex align-items-center gap-1">
              <i class="bi bi-building-fill-gear icon"></i>
              <span>{{ empresa.tipoEmpresa }}</span>
            </div>
            <div class="d-flex align-items-center gap-1">
              <i class="bi bi-geo-alt-fill icon"></i>
              <span>{{ empresa.ciudad }}</span>
            </div>
            <div class="d-flex align-items-center gap-1">
              <i class="bi bi-bag-dash-fill icon"></i>
              <span>{{ empresa.industria }}</span>
            </div>
          </div>
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
</style>
