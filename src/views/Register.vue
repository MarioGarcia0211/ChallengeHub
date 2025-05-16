<template>
  <div class="container-register">
    <div class="card card-register shadow-lg">
      <div class="card-body card-body-register">
        <h1 class="text-center mb-4">Registrarse</h1>

        <!-- Paso 1: Selección de tipo de usuario -->
        <Paso1TipoUsuario
          v-if="pasoActual === 1"
          @seleccionar-tipo="manejarSeleccionTipoUsuario"
        />

        <!-- PASOS PARA PERSONA -->
        <PersonaPaso2DatosBasicos
          v-if="tipoUsuario === 'persona' && pasoActual === 2"
          v-model="datosPersona"
          @siguiente="siguientePaso"
          @anterior="pasoActual--"
        />
        <PersonaPaso3Tecnologias
          v-if="tipoUsuario === 'persona' && pasoActual === 3"
          v-model="datosPersona"
          @siguiente="siguientePaso"
          @anterior="pasoActual--"
        />
        <PersonaPaso4Contacto
          v-if="tipoUsuario === 'persona' && pasoActual === 4"
          v-model="datosPersona"
          @enviar="registrarPersona"
          @anterior="pasoActual--"
        />

        <!-- PASOS PARA EMPRESA -->
        <EmpresaPaso2DatosEmpresa
          v-if="tipoUsuario === 'empresa' && pasoActual === 2"
          v-model="datosEmpresa"
          @siguiente="siguientePaso"
        />
        <EmpresaPaso3Descripcion
          v-if="tipoUsuario === 'empresa' && pasoActual === 3"
          v-model="datosEmpresa"
          @siguiente="siguientePaso"
        />
        <EmpresaPaso4Contacto
          v-if="tipoUsuario === 'empresa' && pasoActual === 4"
          v-model="datosEmpresa"
          @enviar="registrarEmpresa"
          @anterior="pasoActual--"
        />
      </div>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Datos
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <pre v-if="tipoUsuario === 'persona'">{{ datosPersona }}</pre>
              <pre v-if="tipoUsuario === 'empresa'">{{ datosEmpresa }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

// Importar componentes de pasos
import Paso1TipoUsuario from "../components/Registro/Paso1TipoUsuario.vue";
import PersonaPaso2DatosBasicos from "../components/Registro/PersonaPaso2DatosBasicos.vue";
import PersonaPaso3Tecnologias from "../components/Registro/PersonaPaso3Tecnologias.vue";
import PersonaPaso4Contacto from "../components/Registro/PersonaPaso4Contacto.vue";

import EmpresaPaso2DatosEmpresa from "../components/Registro/EmpresaPaso2DatosEmpresa.vue";
import EmpresaPaso3Descripcion from "../components/Registro/EmpresaPaso3Descripcion.vue";
import EmpresaPaso4Contacto from "../components/Registro/EmpresaPaso4Contacto.vue";

// Control de pasos
const pasoActual = ref(1);
const tipoUsuario = ref("");

// Datos de persona
const datosPersona = reactive({
  tipoUsuario: "",
  nombres: "",
  apellidos: "",
  tipoDocumento: "",
  numeroDocumento: "",
  fotoPerfil: null,
  ciudad: "",
  pais: "",
  descripcion: "",
  tecnologias: [],
  habilidades: [],
  recursos: [], // PC, Internet
  preferenciasTrabajo: [],
  hojaDeVida: null,
  whatsapp: "",
  correo: "",
  contrasena: "",
});

// Datos de empresa
const datosEmpresa = reactive({
  tipoUsuario: "",
  tipoEmpresa: "",
  nombre: "",
  nit: "",
  ciudad: "",
  pais: "",
  industria: "",
  otraIndustria: "",
  logo: null,
  paginaWeb: "",
  descripcion: "",
  contacto: "",
  whatsapp: "",
  correo: "",
  contrasena: "",
});

// Funciones
const manejarSeleccionTipoUsuario = (tipo) => {
  tipoUsuario.value = tipo;
  pasoActual.value = 2;

  if (tipo === "persona") {
    datosPersona.tipoUsuario = tipo;
  } else if (tipo === "empresa") {
    datosEmpresa.tipoUsuario = tipo;
  }
};

const siguientePaso = () => {
  pasoActual.value++;
};

const registrarPersona = () => {
  console.log("Registrar persona", datosPersona);
};

const registrarEmpresa = () => {
  console.log("Registrar empresa", datosEmpresa);
};
</script>

<style scoped>
.container-register {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.card-register {
  width: 100%;
  max-width: 900px;
  background: white;
  border-radius: 10px;
}

.card-body-register {
  padding: 2rem;
}
</style>
