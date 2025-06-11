<template>
  <div
    v-if="visible"
    class="modal fade show"
    tabindex="-1"
    style="display: block; background-color: rgba(0, 0, 0, 0.5)"
    @click.self="cerrarModal"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <!-- ENCABEZADO -->
        <div class="modal-header">
          <h5 class="modal-title">
            Candidato: {{ reto?.datosUsuario.nombres }}
            {{ reto?.datosUsuario.apellidos }}
          </h5>
          <button type="button" class="btn-close" @click="cerrarModal"></button>
        </div>

        <!-- NAV TABS -->
        <ul class="nav nav-tabs nav-fill" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              :class="{ active: activeTab === 'datos' }"
              @click="activeTab = 'datos'"
            >
              Datos personales
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              :class="{ active: activeTab === 'reto' }"
              @click="activeTab = 'reto'"
            >
              Datos del reto
            </button>
          </li>
        </ul>

        <!-- CONTENIDO DEL MODAL -->
        <div class="modal-body">
          <!-- DATOS PERSONALES -->
          <div v-if="activeTab === 'datos'">
            <div
              class="d-flex mb-3 align-items-stretch"
              style="min-height: 100px"
            >
              <img
                :src="reto?.datosUsuario?.fotoPerfil"
                alt="Foto de perfil"
                class="me-3 rounded img-cuadrada"
              />
              <div class="d-flex flex-column justify-content-start">
                <!-- Nombre completo -->
                <h5 class="modal-title mb-1">
                  {{ reto?.datosUsuario.nombres }}
                  {{ reto?.datosUsuario.apellidos }}
                </h5>

                <!-- Documento -->
                <p class="text-muted mb-2">
                  {{ tipoDocumentoAbreviado }}
                  {{ reto?.datosUsuario.numeroDocumento }}
                </p>

                <!-- Preferencias de trabajo -->
                <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
                  <i class="bi bi-building-fill-gear icon"></i>
                  <span
                    v-for="(preferencia, index) in reto?.datosUsuario
                      .preferenciasTrabajo"
                    :key="'pref-' + index"
                    class="badge extra-badge"
                  >
                    {{ preferencia }}
                  </span>
                </div>

                <!-- Ciudad y país
                <div class="d-flex align-items-center gap-2 text-muted">
                  <i class="bi bi-geo-alt-fill icon"></i>
                  <span
                    >{{ reto?.datosUsuario.ciudad }},
                    {{ reto?.datosUsuario.pais }}</span
                  >
                </div> -->
              </div>
            </div>

            <p><strong>Correo:</strong> {{ reto?.datosUsuario.correo }}</p>
            <p><strong>WhatsApp:</strong> {{ reto?.datosUsuario.whatsapp }}</p>
            <p>
              <strong>Descripción:</strong> {{ reto?.datosUsuario.descripcion }}
            </p>

            <!-- Habilidades -->
            <p><strong>Habilidades:</strong></p>
            <div class="mb-2">
              <span
                v-for="(hab, index) in mostrarHabilidadesCompletas
                  ? reto?.datosUsuario.habilidades
                  : reto?.datosUsuario.habilidades.slice(0, 3)"
                :key="'hab-' + index"
                class="badge me-1 soft-badge"
              >
                {{ hab }}
              </span>
              <span
                v-if="reto?.datosUsuario.habilidades.length > 3"
                class="badge soft-badge extra-badge"
                style="cursor: pointer"
                @click="
                  mostrarHabilidadesCompletas = !mostrarHabilidadesCompletas
                "
              >
                {{
                  mostrarHabilidadesCompletas
                    ? "Ver menos"
                    : "+" + (reto?.datosUsuario.habilidades.length - 3)
                }}
              </span>
            </div>

            <!-- Tecnologías -->
            <p><strong>Programación:</strong></p>
            <div>
              <span
                v-for="(tec, index) in mostrarTecnologiasCompletas
                  ? reto?.datosUsuario.tecnologias
                  : reto?.datosUsuario.tecnologias.slice(0, 3)"
                :key="'tec-' + index"
                class="badge me-1 soft-badge"
              >
                {{ tec }}
              </span>
              <span
                v-if="reto?.datosUsuario.tecnologias.length > 3"
                class="badge soft-badge extra-badge"
                style="cursor: pointer"
                @click="
                  mostrarTecnologiasCompletas = !mostrarTecnologiasCompletas
                "
              >
                {{
                  mostrarTecnologiasCompletas
                    ? "Ver menos"
                    : "+" + (reto?.datosUsuario.tecnologias.length - 3)
                }}
              </span>
            </div>
          </div>

          <!-- DATOS DEL RETO -->
          <div v-if="activeTab === 'reto'">
            <p>
              <strong>Nombre del reto:</strong> {{ reto?.datosReto.nombreReto }}
            </p>
            <p>
              <strong>Descripción:</strong> {{ reto?.datosReto.descripcion }}
            </p>
            <p>
              <strong>Fecha publicación:</strong>
              {{ formatearFecha(reto?.datosReto.fechaRegistro) }}
            </p>

            <!-- Lenguajes -->
            <p class="mt-3"><strong>Lenguajes:</strong></p>
            <div>
              <span
                v-for="(lang, index) in mostrarLenguajesCompletos
                  ? reto?.datosReto.lenguajes
                  : reto?.datosReto.lenguajes.slice(0, 3)"
                :key="'lang-' + index"
                class="badge me-1 soft-badge"
              >
                {{ lang }}
              </span>
              <span
                v-if="reto?.datosReto.lenguajes.length > 3"
                class="badge soft-badge extra-badge"
                style="cursor: pointer"
                @click="mostrarLenguajesCompletos = !mostrarLenguajesCompletos"
              >
                {{
                  mostrarLenguajesCompletos
                    ? "Ver menos"
                    : "+" + (reto?.datosReto.lenguajes.length - 3)
                }}
              </span>
            </div>

            <!-- Tecnologías -->
            <p><strong>Tecnologías:</strong></p>
            <div>
              <span
                v-for="(tec, index) in mostrarTecnologiasCompletas
                  ? reto?.datosReto.tecnologias
                  : reto?.datosReto.tecnologias.slice(0, 3)"
                :key="'tec-' + index"
                class="badge me-1 soft-badge"
              >
                {{ tec }}
              </span>
              <span
                v-if="reto?.datosReto.tecnologias.length > 3"
                class="badge soft-badge extra-badge"
                style="cursor: pointer"
                @click="
                  mostrarTecnologiasCompletas = !mostrarTecnologiasCompletas
                "
              >
                {{
                  mostrarTecnologiasCompletas
                    ? "Ver menos"
                    : "+" + (reto?.datosReto.tecnologias.length - 3)
                }}
              </span>
            </div>

            <!-- Programación -->
            <p class="mt-3"><strong>Programación:</strong></p>
            <div>
              <span
                v-for="(prog, index) in mostrarProgramacionCompleta
                  ? reto?.datosReto.programacion
                  : reto?.datosReto.programacion.slice(0, 3)"
                :key="'prog-' + index"
                class="badge me-1 soft-badge"
              >
                {{ prog }}
              </span>
              <span
                v-if="reto?.datosReto.programacion.length > 3"
                class="badge soft-badge extra-badge"
                style="cursor: pointer"
                @click="
                  mostrarProgramacionCompleta = !mostrarProgramacionCompleta
                "
              >
                {{
                  mostrarProgramacionCompleta
                    ? "Ver menos"
                    : "+" + (reto?.datosReto.programacion.length - 3)
                }}
              </span>
            </div>

            <!-- Estado -->
            <p><strong>Estado: </strong>{{ reto?.datosReto.estado }}</p>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";

const props = defineProps({
  reto: Object,
  visible: Boolean,
});

const tipoDocumentoAbreviado = computed(() => {
  const mapa = {
    "Cédula de Ciudadanía": "CC",
    "Tarjeta de Identidad": "TI",
    "Tarjeta de Extranjería": "TE",
    Pasaporte: "PAS",
  };
  return mapa[props.reto?.datosUsuario.tipoDocumento];
});

const emit = defineEmits(["cerrar"]);
const activeTab = ref("datos");
const mostrarHabilidadesCompletas = ref(false);
const mostrarTecnologiasCompletas = ref(false);
const mostrarProgramacionCompleta = ref(false);
const mostrarLenguajesCompletos = ref(false);

const cerrarModal = () => {
  emit("cerrar");
  mostrarHabilidadesCompletas.value = false;
  mostrarTecnologiasCompletas.value = false;
  mostrarProgramacionCompleta.value = false;
  mostrarLenguajesCompletos.value = false;
};

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
  margin-bottom: 0.25rem;
}

.extra-badge {
  background-color: #ede9fe;
  color: #6b21a8;
  cursor: pointer;
}

.icon {
  color: #8b5cf6;
  font-size: 1.1rem;
}

.img-cuadrada {
  aspect-ratio: 1 / 1;
  height: 100%;
  object-fit: cover;
  max-width: 100px; /* Ajusta si quieres un límite */
}
</style>
