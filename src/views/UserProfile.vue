<template>
  <Navbar />
  <!-- Loading Overlay -->
  <div v-if="loading" class="loading-overlay">
    <div class="text-center">
      <div
        class="spinner-border text-light"
        style="width: 3rem; height: 3rem"
        role="status"
      >
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="text-white mt-3 fs-5">Cargando información del usuario...</p>
    </div>
  </div>

  <div class="cont-fluid mt-3">
    <div v-show="!loading">
      <!-- Card -->
      <div class="card shadow rounded overflow-hidden">
        <!-- Encabezado con degradado -->
        <div class="card-header-gradient"></div>

        <!-- Datos del usuario -->
        <div class="card-body">
          <div class="row g-3 align-items-center text-center text-md-start">
            <!-- Imagen -->
            <div class="col-md-2 d-flex justify-content-center">
              <img
                :src="usuario.fotoPerfil"
                alt="Foto de perfil"
                class="img-fluid profile-photo"
              />
            </div>

            <!-- Datos -->
            <div class="col-md-10">
              <h5 class="mb-1">
                {{ usuario.nombres }} {{ usuario.apellidos }}
              </h5>
              <p class="text-muted mb-2">
                {{ tipoDocumentoAbreviado }} {{ usuario.numeroDocumento }}
              </p>

              <div
                class="d-flex flex-column flex-sm-row align-items-center align-items-sm-start justify-content-center justify-content-sm-start text-muted mb-3 gap-2"
              >
                <div class="d-flex align-items-center gap-2 flex-wrap">
                  <i class="bi bi-person"></i>
                  <span
                    v-for="(preferencia, index) in usuario.preferenciasTrabajo"
                    :key="'preferencia-' + index"
                    class="badge rounded-pill text-bg-secondary"
                  >
                    {{ preferencia }}
                  </span>
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

      <div class="mt-3">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card shadow rounded">
              <div class="card-body">
                <!-- Información -->
                <h6 class="text-uppercase small mb-3">Información</h6>
                <!-- Pais -->
                <p class="mb-2"><strong>País:</strong> {{ usuario.pais }}</p>

                <!-- Habilidades -->
                <p class="mb-1">
                  <strong>Habilidades:</strong>
                </p>
                <div class="d-flex flex-wrap gap-2 mb-3">
                  <span
                    v-for="(habilidad, index) in usuario.habilidades"
                    :key="'habilidad-' + index"
                    class="badge rounded-pill text-bg-primary"
                  >
                    {{ habilidad }}
                  </span>
                </div>

                <!-- Programación -->
                <p class="mb-1">
                  <strong>Programación:</strong>
                </p>
                <div class="d-flex flex-wrap gap-2 mb-4">
                  <span
                    v-for="(tecnologia, index) in usuario.tecnologias"
                    :key="'tec-' + index"
                    class="badge rounded-pill text-bg-primary"
                  >
                    {{ tecnologia }}
                  </span>
                </div>

                <br />
                <!-- Contacto -->
                <h6 class="text-uppercase small mb-3">Contactos</h6>
                <!-- Correo -->
                <p class="mb-2">
                  <strong>Correo:</strong> {{ usuario.correo }}
                </p>
                <!-- Telefono -->
                <p class="mb-0">
                  <strong>Teléfono:</strong> {{ usuario.whatsapp }}
                </p>
              </div>
            </div>

            <div class="card shadow rounded mt-3">
              <div class="card-body">
                <h6 class="text-uppercase small mb-3">Resumen</h6>
                <p class="card-text mb-2">{{ usuario.descripcion }}</p>
              </div>
            </div>
          </div>

          <!-- Tareas -->
          <div class="col-md-8">
            <div class="card shadow rounded">
              <div class="card-body"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { obtenerDatosUsuario } from "../services/userServices";

import Navbar from "../components/Navbar/Navbar.vue";

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
const loading = ref(true);

onMounted(async () => {
  try {
    usuario.value = await obtenerDatosUsuario();
    console.log("Datos del usuario:", usuario.value);
  } catch (error) {
    console.error("Error cargando usuario:", error);
  } finally {
    loading.value = false;
  }
});

const tipoDocumentoAbreviado = computed(() => {
  const mapa = {
    "Cédula de Ciudadanía": "CC",
    "Tarjeta de Identidad": "TI",
    "Tarjeta de Extranjería": "TE",
    Pasaporte: "PAS",
  };
  return mapa[usuario.value.tipoDocumento] || usuario.value.tipoDocumento;
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-header-gradient {
  position: relative;
  height: 40px;
  margin: 0 -1.5rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background: linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6);
}
.profile-photo {
  width: 75%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.75rem;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #f8fafc;
}
</style>
