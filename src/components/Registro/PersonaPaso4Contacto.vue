<template>
  <div>
    <h6 class="text-end">Paso 4 de 4</h6>
    <div class="row align-items-center">
      <!-- Recursos -->
      <div class="col-md-12 mb-2">
        <label class="form-label">¿Qué recursos tienes?</label>
        <div class="row">
          <div
            class="col-md-12 col-sm-6"
            v-for="recurso in recursosDisponibles"
            :key="recurso"
          >
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`rec-${recurso}`"
                :value="recurso"
                v-model="form.recursos"
              />
              <label class="form-check-label" :for="`rec-${recurso}`">{{
                recurso
              }}</label>
            </div>
          </div>
        </div>
      </div>

      <!-- Preferencias de trabajo -->
      <div class="col-md-6 mb-2">
        <label class="form-label">¿Dónde te gustaría trabajar?</label>
        <div class="dropdown w-100">
          <div
            class="form-control dropdown-toggle d-flex justify-content-between align-items-center"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="cursor: pointer"
          >
            <span
              class="text-muted"
              v-if="form.preferenciasTrabajo.length === 0"
            >
              Selecciona dónde te gustaría trabajar
            </span>
            <span v-else>{{ form.preferenciasTrabajo.join(", ") }}</span>
          </div>
          <ul
            class="dropdown-menu w-100 shadow-sm"
            style="max-height: 200px; overflow-y: auto"
          >
            <li
              v-for="preferenciaTrabajo in preferenciasTrabajoDisponibles"
              :key="preferenciaTrabajo"
            >
              <div class="dropdown-item">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="`rec-${preferenciaTrabajo}`"
                    :value="preferenciaTrabajo"
                    v-model="form.preferenciasTrabajo"
                  />
                  <label
                    class="form-check-label"
                    :for="`rec-${preferenciaTrabajo}`"
                  >
                    {{ preferenciaTrabajo }}
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Hoja de vida -->
      <div class="col-md-6 mb-2">
        <label class="form-label">Hoja de vida</label>
        <input type="file" class="form-control" />
      </div>

      <!-- WhatsApp -->
      <div class="col-md-6 mb-2">
        <label for="whatsapp" class="form-label">WhatsApp</label>
        <input
          id="whatsapp"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errores.whatsapp }"
          placeholder="+57"
          v-model="form.whatsapp"
          @input="errores.whatsapp = ''"
          @blur="validarCampo('whatsapp', form.whatsapp)"
        />
      </div>

      <!-- Correo -->
      <div class="col-md-6 mb-2">
        <label for="correo" class="form-label">Correo electrónico</label>
        <input
          id="correo"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errores.correo }"
          v-model="form.correo"
          @input="errores.correo = ''"
          @blur="validarCampo('correo', form.correo)"
        />
      </div>

      <!-- Contraseña -->
      <div class="col-md-6 mb-2">
        <label for="contrasena" class="form-label">Contraseña</label>
        <input
          id="contrasena"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errores.contrasena }"
          v-model="form.contrasena"
          placeholder="Mínimo 8 caracteres"
          @input="errores.contrasena = ''"
          @blur="validarCampo('contrasena', form.contrasena)"
        />
      </div>

      <!-- Confirmar contraseña -->
      <div class="col-md-6 mb-2">
        <label for="confirmarContrasena" class="form-label"
          >Confirmar contraseña</label
        >
        <input
          id="confirmarContrasena"
          type="password"
          class="form-control"
          :class="{
            'is-invalid': errores.confirmarContrasena || contrasenasNoCoinciden,
          }"
          v-model="confirmarContrasena"
          placeholder="Mínimo 8 caracteres"
          @input="errores.confirmarContrasena = ''"
          @blur="validarCampo('confirmarContrasena', confirmarContrasena)"
        />
      </div>
    </div>

    <!-- Botones -->
    <div class="d-flex justify-content-between mt-2">
      <button class="btn btn-secondary" @click="$emit('anterior')">
        Atrás
      </button>
      <button
        class="btn btn-primary"
        @click="validarYEnviar"
        :disabled="!formularioValido"
      >
        Registrarse
      </button>
    </div>
  </div>

  <!-- Alertas -->
  <Alertas ref="alertasRef" />
</template>

<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import Dropdown from "bootstrap/js/dist/dropdown";
import Alertas from "../Alertas/Alertas.vue";
import { verificarCorreoUnico } from "../../services/authServices";

const confirmarContrasena = ref("");
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "enviar", "anterior"]);
const alertasRef = ref(null);

const form = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

onMounted(() => {
  const dropdowns = document.querySelectorAll('[data-bs-toggle="dropdown"]');
  dropdowns.forEach((el) => new Dropdown(el));
});

const preferenciasTrabajoDisponibles = ["Startup", "Empresa", "Gobierno"];

const recursosDisponibles = ["PC", "Internet"];

const errores = reactive({
  whatsapp: "",
  correo: "",
  contrasena: "",
  confirmarContrasena: "",
});

function validarCampo(nombre, valor) {
  if (!valor.trim()) {
    errores[nombre] = "Este campo es requerido";
  } else if (nombre === "correo" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
    errores[nombre] = "Debe ser un correo válido";
  } else if (
    (nombre === "contrasena" || nombre === "confirmarContrasena") &&
    valor.length < 8
  ) {
    errores[nombre] = "Debe tener al menos 8 caracteres";
  } else {
    errores[nombre] = "";
  }
}

const contrasenasNoCoinciden = computed(() => {
  return (
    confirmarContrasena.value &&
    form.value.contrasena !== confirmarContrasena.value
  );
});

const formularioValido = computed(() => {
  return (
    form.value.whatsapp.trim() !== "" &&
    form.value.correo.includes("@") &&
    form.value.contrasena.length >= 8 &&
    confirmarContrasena.value.length >= 8 &&
    form.value.contrasena === confirmarContrasena.value &&
    Object.values(errores).every((e) => e === "")
  );
});

async function validarYEnviar() {
  validarCampo("whatsapp", form.value.whatsapp);
  validarCampo("correo", form.value.correo);
  validarCampo("contrasena", form.value.contrasena);
  validarCampo("confirmarContrasena", confirmarContrasena.value);

  if (!formularioValido.value) return;

  // Verifica si el correo ya esta registrado
  const existe = await verificarCorreoUnico(form.value.correo);

  if (existe) {
    errores.correo = "Este correo ya está registrado.";
    alertasRef.value?.mostrarToast?.(
      "error",
      errores.correo,
      "",
      "toast-error"
    );
    return;
  }

  emit("enviar");
}
</script>
