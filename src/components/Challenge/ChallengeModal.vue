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
        <div class="modal-header align-items-start flex-column">
          <div class="d-flex align-items-center w-100 mb-2">
            <img
              :src="reto.empresa.logo"
              alt="Logo empresa"
              class="img-fluid object-fit-cover me-2"
              style="width: 80px; height: 80px"
            />
            <div>
              <h5 class="modal-title mb-0">{{ reto.nombreReto }}</h5>
              <small class="text-muted">
                Registrado por <strong>{{ reto.empresa.nombreEmpresa }}</strong>
              </small>
              <br />
              <span class="text-muted me-1">Estado:</span>
              <span
                class="badge"
                :class="{
                  'bg-success': reto.estado.toLowerCase() === 'abierto',
                  'bg-danger': reto.estado.toLowerCase() === 'cerrado',
                  'bg-secondary':
                    reto.estado.toLowerCase() !== 'abierto' &&
                    reto.estado.toLowerCase() !== 'cerrado',
                }"
              >
                {{ reto.estado }}
              </span>
            </div>
          </div>
        </div>

        <div class="modal-body">
          <p><strong>Descripción:</strong></p>
          <div>
            <span>{{ reto.descripcion }}</span>
          </div>

          <!-- Lenguajes -->
          <p class="mt-3"><strong>Lenguajes:</strong></p>
          <div>
            <span
              v-for="(lang, index) in mostrarLenguajesCompletos
                ? reto.lenguajes
                : reto.lenguajes.slice(0, 3)"
              :key="'lang-' + index"
              class="badge me-1 soft-badge"
            >
              {{ lang }}
            </span>
            <span
              v-if="reto.lenguajes.length > 3"
              class="badge soft-badge extra-badge"
              style="cursor: pointer"
              @click="mostrarLenguajesCompletos = !mostrarLenguajesCompletos"
            >
              {{
                mostrarLenguajesCompletos
                  ? "Ver menos"
                  : "+" + (reto.lenguajes.length - 3)
              }}
            </span>
          </div>

          <!-- Tecnologías -->
          <p class="mt-3"><strong>Tecnologías:</strong></p>
          <div>
            <span
              v-for="(tec, index) in mostrarTecnologiasCompletas
                ? reto.tecnologias
                : reto.tecnologias.slice(0, 3)"
              :key="'tec-' + index"
              class="badge me-1 soft-badge"
            >
              {{ tec }}
            </span>
            <span
              v-if="reto.tecnologias.length > 3"
              class="badge soft-badge extra-badge"
              style="cursor: pointer"
              @click="
                mostrarTecnologiasCompletas = !mostrarTecnologiasCompletas
              "
            >
              {{
                mostrarTecnologiasCompletas
                  ? "Ver menos"
                  : "+" + (reto.tecnologias.length - 3)
              }}
            </span>
          </div>

          <!-- Programación -->
          <p class="mt-3"><strong>Programación:</strong></p>
          <div>
            <span
              v-for="(prog, index) in mostrarProgramacionCompleta
                ? reto.programacion
                : reto.programacion.slice(0, 3)"
              :key="'prog-' + index"
              class="badge me-1 soft-badge"
            >
              {{ prog }}
            </span>
            <span
              v-if="reto.programacion.length > 3"
              class="badge soft-badge extra-badge"
              style="cursor: pointer"
              @click="
                mostrarProgramacionCompleta = !mostrarProgramacionCompleta
              "
            >
              {{
                mostrarProgramacionCompleta
                  ? "Ver menos"
                  : "+" + (reto.programacion.length - 3)
              }}
            </span>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
          <button class="btn btn-primary">Participar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  visible: Boolean,
  reto: Object,
});

const emit = defineEmits(["cerrar"]);

const cerrarModal = () => {
  emit("cerrar");
  // Opcional: resetear estados al cerrar
  mostrarLenguajesCompletos.value = false;
  mostrarTecnologiasCompletas.value = false;
  mostrarProgramacionCompleta.value = false;
};

const mostrarLenguajesCompletos = ref(false);
const mostrarTecnologiasCompletas = ref(false);
const mostrarProgramacionCompleta = ref(false);
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
</style>
