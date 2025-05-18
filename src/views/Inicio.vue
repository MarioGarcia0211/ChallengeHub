<template>
  <Navbar />
  <div class="cont-fluid mt-3">
    <!-- Card -->
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
              :src="usuario.fotoPerfil"
              alt="Foto de perfil"
              class="img-fluid rounded border"
              style="object-fit: cover; aspect-ratio: 1 / 1; width: 75%"
            />
          </div>

          <!-- Datos -->
          <div class="col-md-10">
            <h5 class="mb-1">{{ usuario.nombres }} {{ usuario.apellidos }}</h5>
            <p class="text-muted mb-2">CC {{ usuario.numeroDocumento }}</p>

            <div
              class="d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-center justify-content-sm-start text-muted mb-3 gap-2"
            >
              <div class="d-flex align-items-center gap-1">
                <i class="bi bi-person"></i>
                <span>{{ usuario.tipoUsuario }}</span>
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

    <!-- Tabs -->
    <ul class="nav nav-pills mt-3">
      <!-- Perfil -->
      <li class="nav-item">
        <router-link to="/perfil" class="nav-link active"
          ><i class="bi bi-person-check"></i> Perfil</router-link
        >
      </li>

      <!-- Retos -->
      <li class="nav-item">
        <router-link to="/perfil" class="nav-link"
          ><i class="bi bi-flag-fill"></i> Mis retos</router-link
        >
      </li>

      <!-- Vacantes -->
      <li class="nav-item">
        <router-link to="/perfil" class="nav-link"
          ><i class="bi bi-briefcase me-1"></i> Mis vacantes</router-link
        >
      </li>

      <!-- Conexiones -->
      <li class="nav-item">
        <router-link to="/perfil" class="nav-link"
          ><i class="bi bi-people-fill"></i> Conexiones</router-link
        >
      </li>
    </ul>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { obtenerDatosUsuario } from "../services/usuarioServices";

import Navbar from "../components/Navbar/Navbar.vue";
import Footer from "../components/Footer/Footer.vue";

const usuario = ref({
  tipoUsuario: "",
  nombres: "",
  apellidos: "",
  tipoDocumento: "",
  numeroDocumento: "",
  fotoPerfil: "",
  ciudad: "",
  pais: "",
  descripcion: "",
  tecnologias: [],
  habilidades: [],
  recursos: [],
  preferenciasTrabajo: [],
  hojaDeVida: "",
  whatsapp: "",
  correo: "",
  contrasena: "",
});

onMounted(async () => {
  try {
    usuario.value = await obtenerDatosUsuario();
    console.log("Datos del usuario:", usuario.value);
  } catch (error) {
    console.error("Error cargando usuario:", error);
  }
});
</script>
