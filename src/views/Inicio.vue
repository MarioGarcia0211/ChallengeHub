<template>
  <Navbar />
  <div class="cont-fluid mt-4">
    <div class="card shadow rounded overflow-hidden">
      <!-- Encabezado con degradado -->
      <div
        class="card-header text-white fw-semibold p-0"
        style="
          height: 8px;
          background: linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6);
        "
      ></div>

      <!-- Datos del usuario -->
      <div class="card-body">
        <div class="row g-3 align-items-center text-center text-md-start">
          <!-- Imagen -->
          <div class="col-md-2 d-flex justify-content-center">
            <img
              :src="usuario.foto"
              alt="Foto de perfil"
              class="img-fluid rounded border"
              style="object-fit: cover; aspect-ratio: 1 / 1; width: 85%"
            />
          </div>

          <!-- Datos -->
          <div class="col-md-10">
            <h5 class="mb-1">{{ usuario.nombre }}</h5>
            <p class="text-muted mb-2">CC {{ usuario.documento }}</p>

            <div
              class="d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-center justify-content-sm-start text-muted mb-3 gap-2"
            >
              <div class="d-flex align-items-center gap-1">
                <i class="bi bi-person"></i>
                <span>Persona</span>
              </div>
              <div class="d-flex align-items-center gap-1">
                <i class="bi bi-geo-alt"></i>
                <span>{{ usuario.ciudad }}</span>
              </div>
            </div>

            <div
              class="d-flex flex-wrap justify-content-center justify-content-md-start gap-2"
            >
              <button class="btn btn-outline-primary btn-sm">
                <i class="bi bi-trophy me-1"></i>
                Retos Disponibles
              </button>
              <button class="btn btn-outline-primary btn-sm">
                <i class="bi bi-briefcase me-1"></i>
                Ver Vacantes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import fotoPerfil from "../assets/nagi.jpg";
import Footer from "../components/Footer/Footer.vue";
import Navbar from "../components/Navbar/Navbar.vue";

const usuario = {
  nombre: "MARIO GARCÍA",
  documento: "1007784144",
  ciudad: "Buenaventura",
  foto: fotoPerfil,
};
</script>
