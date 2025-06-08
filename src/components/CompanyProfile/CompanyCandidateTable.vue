<template>
  <div>
    <div class="table-responsive">
      <table class="table table-bordered text-center align-middle">
        <thead class="table-light">
          <tr>
            <th>Participante</th>
            <th>Estado</th>
            <th>Contacto</th>
            <th>Ubicación</th>
            <th>Fecha de postulación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reto in retos" :key="reto.id">
            <!-- Participante -->
            <td class="text-center">
              <div class="d-flex align-items-center gap-2">
                <img
                  v-if="reto.datosUsuario?.fotoPerfil"
                  :src="reto.datosUsuario.fotoPerfil"
                  alt="Foto perfil"
                  class="rounded"
                  width="60"
                  height="60"
                />
                <div>
                  <strong
                    >{{ reto.datosUsuario?.nombres }}
                    {{ reto.datosUsuario?.apellidos }}</strong
                  >
                </div>
              </div>
            </td>
            <!-- Estado -->
            <td>
              <span :class="estadoClass(reto.estado)">
                {{ reto.estado }}
              </span>
            </td>
            <!-- Contacto -->
            <td class="text-center">
              <!-- Correo -->
              <div class="d-flex align-items-center gap-1">
                <i class="bi bi-envelope text-primary"></i>
                <a
                  :title="`Enviar mensaje por correo`"
                  class="link-personalizado"
                  :href="`mailto:${reto.datosUsuario?.correo}`"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ reto.datosUsuario?.correo }}
                </a>
              </div>

              <!-- WhatsApp -->
              <div class="d-flex align-items-center gap-1">
                <i class="bi bi-whatsapp text-success"></i>
                <a
                  :title="`Enviar mensaje por whatsapp`"
                  class="link-personalizado"
                  :href="`https://wa.me/${reto.datosUsuario?.whatsapp?.replace(
                    /[^0-9]/g,
                    ''
                  )}`"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ reto.datosUsuario?.whatsapp }}
                </a>
              </div>
            </td>

            <!-- Ubicacion -->
            <td class="text-center">
              <div class="d-flex align-items-center gap-1">
                <i class="bi bi-cursor text-purple"></i>
                <span
                  >{{ reto.datosUsuario?.ciudad }},
                  {{ reto.datosUsuario?.pais }}</span
                >
              </div>
            </td>
            <!-- Fecha de postulacion -->
            <td>{{ formatearFecha(reto.fechaRegistro) }}</td>
            <!-- Acciones -->
            <td>
              <button
                class="btn btn-sm btn-primary me-1"
                @click="abrirModal(reto)"
              >
                Ver participante
              </button>

              <button class="btn btn-sm btn-primary me-1">Ver reto</button>
              <button class="btn btn-sm btn-warning">Cambiar estado</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal participante -->
  <CompanyCandidateModal
    :visible="mostrarModal"
    :reto="retoSeleccionado"
    @cerrar="mostrarModal = false"
  />
</template>

<script setup>
import { ref } from "vue";
import CompanyCandidateModal from "./CompanyCandidateModal.vue";

const props = defineProps({
  retos: Object,
});

const mostrarModal = ref(false);
const retoSeleccionado = ref(null);

function abrirModal(reto) {
  retoSeleccionado.value = reto;
  mostrarModal.value = true;
  console.log("Seleccionado:", retoSeleccionado.value);
}

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

const estadoClass = (estado) => {
  switch (estado) {
    case "pendiente":
      return "badge bg-warning text-dark";
    case "aceptado":
      return "badge bg-success";
    case "rechazado":
      return "badge bg-danger";
    case "proceso":
      return "badge bg-primary";
    case "revision":
      return "badge bg-info text-dark";
    default:
      return "badge bg-secondary";
  }
};
</script>

<style scoped>
.table th,
.table td {
  white-space: nowrap;
  vertical-align: middle;
  padding: 1rem 2.1rem;
}

img {
  object-fit: cover;
}

/* Color morado personalizado */
.text-purple {
  color: #6f42c1;
}

.link-personalizado {
  text-decoration: none;
  font-weight: normal;
  color: black;
}

.link-personalizado:hover {
  text-decoration: underline;
}
</style>
