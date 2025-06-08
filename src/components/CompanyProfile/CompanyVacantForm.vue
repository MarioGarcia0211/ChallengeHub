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
        <div class="modal-header">
          <h5 class="modal-title">
            {{ isEditing ? "Editar vacante" : "Crear vacante" }}
          </h5>
          <button type="button" class="btn-close" @click="cerrarModal" />
        </div>

        <div class="modal-body">
          <!-- Nombre -->
          <div class="mb-3">
            <label class="form-label">Nombre del vacante</label>
            <input
              v-model="vacante.nombreVacante"
              type="text"
              class="form-control"
            />
          </div>

          <!-- Descripción -->
          <div class="mb-3">
            <label class="form-label">Descripción</label>
            <textarea
              v-model="vacante.descripcion"
              class="form-control"
              rows="3"
            ></textarea>
          </div>

          <!-- Estado -->
          <div class="mb-3">
            <label class="form-label">Estado</label>
            <select v-model="vacante.estado" class="form-select">
              <option value="">Seleccione...</option>
              <option value="abierto">Abierto</option>
              <option value="cerrado">Cerrado</option>
            </select>
          </div>

          <!-- Tecnologías necesarias -->
          <div class="mb-3">
            <label class="form-label">Tecnologías necesarias</label>
            <div class="dropdown w-100 position-relative">
              <button
                class="form-control text-start dropdown-toggle d-flex justify-content-between align-items-center text-truncate"
                type="button"
                data-bs-toggle="dropdown"
                :title="vacante.tecnologias.join(', ')"
              >
                <div class="d-flex flex-wrap gap-1">
                  <span
                    v-for="tec in vacante.tecnologias"
                    :key="tec"
                    class="badge bg-primary text-light"
                  >
                    {{ tec }}
                  </span>
                  <span
                    v-if="vacante.tecnologias.length === 0"
                    class="text-muted"
                  >
                    Selecciona tecnologías
                  </span>
                </div>
              </button>

              <ul
                class="dropdown-menu w-100 shadow-sm"
                style="max-height: 200px; overflow-y: auto"
              >
                <li v-for="tec in tecnologiasDisponibles" :key="tec">
                  <div class="dropdown-item">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :id="`tec-${tec}`"
                        :value="tec"
                        v-model="vacante.tecnologias"
                      />
                      <label class="form-check-label" :for="`tec-${tec}`">{{
                        tec
                      }}</label>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Enfoque de programación -->
          <div class="mb-3">
            <label class="form-label">Enfoque de programación</label>
            <div class="dropdown w-100 position-relative">
              <button
                class="form-control text-start dropdown-toggle d-flex justify-content-between align-items-center text-truncate"
                type="button"
                data-bs-toggle="dropdown"
                :title="vacante.programacion.join(', ')"
              >
                <div class="d-flex flex-wrap gap-1">
                  <span
                    v-for="prog in vacante.programacion"
                    :key="prog"
                    class="badge bg-success text-light"
                  >
                    {{ prog }}
                  </span>
                  <span
                    v-if="vacante.programacion.length === 0"
                    class="text-muted"
                  >
                    Selecciona enfoques
                  </span>
                </div>
              </button>

              <ul
                class="dropdown-menu w-100 shadow-sm"
                style="max-height: 200px; overflow-y: auto"
              >
                <li v-for="prog in programacionDisponible" :key="prog">
                  <div class="dropdown-item">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :id="`prog-${prog}`"
                        :value="prog"
                        v-model="vacante.programacion"
                      />
                      <label class="form-check-label" :for="`prog-${prog}`">{{
                        prog
                      }}</label>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Lenguajes aceptados -->
          <div class="mb-3">
            <label class="form-label">Lenguajes aceptados</label>
            <div class="dropdown w-100 position-relative">
              <button
                class="form-control text-start dropdown-toggle d-flex justify-content-between align-items-center text-truncate"
                type="button"
                data-bs-toggle="dropdown"
                :title="vacante.lenguajes.join(', ')"
              >
                <div class="d-flex flex-wrap gap-1">
                  <span
                    v-for="lang in vacante.lenguajes"
                    :key="lang"
                    class="badge bg-info text-dark"
                  >
                    {{ lang }}
                  </span>
                  <span
                    v-if="vacante.lenguajes.length === 0"
                    class="text-muted"
                  >
                    Selecciona lenguajes
                  </span>
                </div>
              </button>

              <ul
                class="dropdown-menu w-100 shadow-sm"
                style="max-height: 200px; overflow-y: auto"
              >
                <li v-for="lang in lenguajesDisponibles" :key="lang">
                  <div class="dropdown-item">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :id="`lang-${lang}`"
                        :value="lang"
                        v-model="vacante.lenguajes"
                      />
                      <label class="form-check-label" :for="`lang-${lang}`">{{
                        lang
                      }}</label>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="cerrarModal">
            Cancelar
          </button>
          <button
            class="btn btn-primary"
            @click="guardarVacante"
            :disabled="!vacante.nombreVacante || !vacante.estado"
          >
            {{ isEditing ? "Actualizar vacante" : "Guardar vacante" }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Alerta -->
  <Alertas ref="alertasRef" />
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import Dropdown from "bootstrap/js/dist/dropdown";
import { crearVacante, actualizarVacante } from "../../services/vacantServices";
import Alertas from "../Alertas/Alertas.vue";

// Props y emits
const props = defineProps({
  visible: Boolean,
  empresa: Object,
  vacante: Object,
});
const emit = defineEmits(["cerrar", "guardado"]);
const alertasRef = ref(null);

onMounted(() => {
  const dropdowns = document.querySelectorAll('[data-bs-toggle="dropdown"]');
  dropdowns.forEach((el) => new Dropdown(el));
});

// Formulario del vacante
const vacante = ref({
  nombreVacante: "",
  descripcion: "",
  estado: "",
  tecnologias: [],
  programacion: [],
  lenguajes: [],
});

const isEditing = computed(() => !!props.vacante?.id);
console.log("Edit", isEditing.value);

const tecnologiasDisponibles = [
  "React",
  "Vue.js",
  "Angular",
  "Marketing Digital",
  "Soporte",
  "Svelte",
  "Ember.js",
  "Backbone.js",
  "Django",
  "Flask",
  "Ruby on Rails",
  "Spring",
  "Laravel",
  "ASP.NET",
  "Express.js",
  "NestJS",
  "Google Cloud",
  "AWS",
  "Azure",
  "Firebase",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "SQLite",
  "Redis",
  "DynamoDB",
];

const programacionDisponible = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Mobile",
  "Desktop",
  "Web",
  "API",
  "Microservicios",
  "Monolítico",
  "Serverless",
  "Cloud",
  "On-premise",
];
const lenguajesDisponibles = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "PHP",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "Rust",
  "Scala",
  "Perl",
  "R",
  "Haskell",
  "Lua",
  "Dart",
  "Objective-C",
  "Clojure",
  "F#",
  "Erlang",
  "Julia",
  "COBOL",
  "Fortran",
  "Ada",
  "Lisp",
  "Scheme",
  "Prolog",
  "Smalltalk",
  "Pascal",
  "Basic",
  "Assembly",
  "C",
  "C++",
];

// Cerrar modal
const cerrarModal = () => {
  emit("cerrar");
};

watch(
  () => props.visible,
  (nuevoVisible) => {
    if (nuevoVisible) {
      vacante.value = {
        nombreVacante: props.vacante?.nombreVacante || "",
        descripcion: props.vacante?.descripcion || "",
        estado: props.vacante?.estado || "",
        tecnologias: [...(props.vacante?.tecnologias || [])],
        programacion: [...(props.vacante?.programacion || [])],
        lenguajes: [...(props.vacante?.lenguajes || [])],
      };
    }
  },
  { immediate: true }
);

// Guardar vacante
const guardarVacante = async () => {
  try {
    const nuevoVacante = {
      ...vacante.value,
      idUsuarioEmpresa: props.empresa?.uid || null,
    };

    if (isEditing.value) {
      await actualizarVacante(props.vacante?.id, nuevoVacante);
      alertasRef.value?.mostrarToast?.(
        "success",
        "Vacante actualizada",
        "",
        "toast-success"
      );
      emit("guardado", nuevoVacante);
    } else {
      const id = await crearVacante(nuevoVacante);
      alertasRef.value?.mostrarToast?.(
        "success",
        "Vacante creada",
        "",
        "toast-success"
      );
      emit("guardado", { ...nuevoVacante, id });
    }
    cerrarModal();

    vacante.value = {
      nombreVacante: "",
      descripcion: "",
      estado: "",
      tecnologias: [],
      programacion: [],
      lenguajes: [],
      id: null,
    };
  } catch (error) {
    console.error("Error al guardar el vacante:", error);
  }
};
</script>

<style scoped>
.dropdown-menu {
  max-width: 100%;
  overflow-x: auto;
}

.dropdown-item {
  white-space: normal;
  word-break: break-word;
}
</style>
