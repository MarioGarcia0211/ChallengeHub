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

        <!-- PASOS PARA Persona -->
        <PersonaPaso2DatosBasicos
          v-if="tipoUsuario === 'Persona' && pasoActual === 2"
          v-model="datosPersona"
          @siguiente="siguientePaso"
          @anterior="pasoActual--"
        />
        <PersonaPaso3Tecnologias
          v-if="tipoUsuario === 'Persona' && pasoActual === 3"
          v-model="datosPersona"
          @siguiente="siguientePaso"
          @anterior="pasoActual--"
        />
        <PersonaPaso4Contacto
          v-if="tipoUsuario === 'Persona' && pasoActual === 4"
          v-model="datosPersona"
          @enviar="registrarPersona"
          @anterior="pasoActual--"
        />

        <!-- PASOS PARA EMPRESA -->
        <EmpresaPaso2DatosEmpresa
          v-if="tipoUsuario === 'Empresa' && pasoActual === 2"
          v-model="datosEmpresa"
          @siguiente="siguientePaso"
          @anterior="pasoActual--"
        />
        <EmpresaPaso3Descripcion
          v-if="tipoUsuario === 'Empresa' && pasoActual === 3"
          v-model="datosEmpresa"
          @siguiente="siguientePaso"
          @anterior="pasoActual--"
        />
        <EmpresaPaso4Contacto
          v-if="tipoUsuario === 'Empresa' && pasoActual === 4"
          v-model="datosEmpresa"
          @enviar="registrarEmpresa"
          @anterior="pasoActual--"
        />
        <p class="mt-3 text-center">
          ¿Ya tienes una cuenta?
          <router-link to="/login">Inicia sesión</router-link>
        </p>
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
              <pre v-if="tipoUsuario === 'Persona'">{{ datosPersona }}</pre>
              <pre v-if="tipoUsuario === 'Empresa'">{{ datosEmpresa }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Paso1TipoUsuario from "../components/Registro/Paso1TipoUsuario.vue";
import PersonaPaso2DatosBasicos from "../components/Registro/PersonaPaso2DatosBasicos.vue";
import PersonaPaso3Tecnologias from "../components/Registro/PersonaPaso3Tecnologias.vue";
import PersonaPaso4Contacto from "../components/Registro/PersonaPaso4Contacto.vue";
import EmpresaPaso2DatosEmpresa from "../components/Registro/EmpresaPaso2DatosEmpresa.vue";
import EmpresaPaso3Descripcion from "../components/Registro/EmpresaPaso3Descripcion.vue";
import EmpresaPaso4Contacto from "../components/Registro/EmpresaPaso4Contacto.vue";
import { registrarUsuario } from "../services/authServices";

// Control de pasos
const pasoActual = ref(1);
const tipoUsuario = ref("");

// Datos de Persona
const datosPersona = reactive({
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

// Datos de Empresa
const datosEmpresa = reactive({
  tipoUsuario: "",
  tipoEmpresa: "",
  nombreEmpresa: "",
  nit: "",
  ciudad: "",
  pais: "",
  industria: "",
  otraIndustria: "",
  logo: "",
  paginaWeb: "",
  descripcion: "",
  contacto: "",
  whatsapp: "",
  correo: "",
  contrasena: "",
});

const manejarSeleccionTipoUsuario = ({ tipo, tipoEmpresa }) => {
  tipoUsuario.value = tipo;
  pasoActual.value = 2;

  if (tipo === "Persona") {
    datosPersona.tipoUsuario = tipo;
  } else if (tipo === "Empresa") {
    datosEmpresa.tipoUsuario = tipo;
    datosEmpresa.tipoEmpresa = tipoEmpresa || "";
  }
};

const siguientePaso = () => {
  pasoActual.value++;
};

const registrarPersona = async () => {
  try {
    const datos = { ...datosPersona };
    console.log("Datos registrados: ", datos);

    await registrarUsuario(datos.correo, datos.contrasena, "Persona", datos);
    console.log("Registro de persona exitoso");
  } catch (error) {
    console.error("Error al registrar persona:", error);
  }
};

const registrarEmpresa = async () => {
  try {
    const datos = { ...datosEmpresa };

    await registrarUsuario(datos.correo, datos.contrasena, "Empresa", datos);
    console.log("Registro de empresa exitoso");
  } catch (error) {
    console.error("Error al registrar empresa:", error);
  }
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

.text-center a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.text-center a:hover {
  text-decoration: underline;
}
</style>
