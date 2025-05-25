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

        <p class="mt-3 text-center">
          ¿Ya tienes una cuenta?
          <router-link to="/login">Inicia sesión</router-link>
        </p>
      </div>
    </div>
  </div>
  <!-- Alertas -->
  <Alertas ref="alertasRef" />
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { registrarUsuario } from "../services/authServices";
import Alertas from "../components/Alertas/Alertas.vue";
import Paso1TipoUsuario from "../components/Registro/Paso1TipoUsuario.vue";
import PersonaPaso2DatosBasicos from "../components/Registro/PersonaPaso2DatosBasicos.vue";
import PersonaPaso3Tecnologias from "../components/Registro/PersonaPaso3Tecnologias.vue";
import PersonaPaso4Contacto from "../components/Registro/PersonaPaso4Contacto.vue";

const router = useRouter();
const pasoActual = ref(1);
const tipoUsuario = ref("");
const alertasRef = ref(null);

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

  if (tipo === "persona") {
    datosPersona.tipoUsuario = tipo;
  } else if (tipo === "empresa") {
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
    await registrarUsuario(datos.correo, datos.contrasena, "persona", datos);
    alertasRef.value?.mostrarToast?.(
      "success",
      "Registro exitoso",
      "",
      "toast-success"
    );
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  } catch (error) {
    console.error("Error al registrar persona:", error);
  }
};
</script>

<style>
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

.swal2-toast {
  width: 308px !important;
  max-width: 350px !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2) !important;
  margin: 1rem !important;
  padding: 1rem !important;
}
</style>
