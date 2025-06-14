<template>
  <div class="container-login">
    <div class="card card-login shadow-lg">
      <div class="card-body card-body-login">
        <h1 class="text-center">Iniciar Sesión</h1>

        <form @submit.prevent="login">
          <div class="mb-3">
            <label class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" v-model="correo" />
          </div>

          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input type="password" class="form-control" v-model="clave" />
          </div>

          <div class="d-grid">
            <button type="submit" class="btn btn-primary">
              Iniciar Sesión
            </button>
          </div>
        </form>

        <p class="mt-3 text-center">
          ¿No tienes cuenta?
          <router-link to="/register">Regístrate aquí</router-link>
        </p>
      </div>
    </div>
  </div>
  <!-- Alerta -->
  <Alertas ref="alertasRef" />
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { iniciarSesion } from "../services/authServices";
import { obtenerTipoUsuario } from "../services/userServices";
import Alertas from "../components/Alertas/Alertas.vue";

const correo = ref("");
const clave = ref("");
const router = useRouter();
const alertasRef = ref(null);

const login = async () => {
  if (!correo.value || !clave.value) {
    alertasRef.value?.mostrarToast?.(
      "error",
      "Por favor, completa todos los campos.",
      "",
      "toast-error"
    );
    return;
  }

  try {
    const usuario = await iniciarSesion(correo.value, clave.value);
    if (!usuario || !usuario.uid) {
      throw new Error("No se pudo obtener la información del usuario.");
    }
    const tipoUsuario = await obtenerTipoUsuario(usuario.uid);
    if (tipoUsuario === "persona") {
      router.push("/user-profile");
    } else if (tipoUsuario === "empresa") {
      router.push("/company-profile");
    } else {
      alertasRef.value?.mostrarToast?.(
        "error",
        "Tipo de usuario no reconocido.",
        "",
        "toast-error"
      );
    }
  } catch (error) {
    alertasRef.value?.mostrarToast?.("error", error, "", "toast-error");
    console.log("Error al iniciar sesión:", error);
  }
};
</script>

<style scoped>
.container-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.card-login {
  width: 100%;
  max-width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: white;
}

.card-body-login h1 {
  text-transform: uppercase;
}

.card-body-login {
  padding: 2rem;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
  width: 100%;
}

.text-center a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.text-center a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .card-body-login {
    padding: 1.5rem;
  }

  .btn-primary {
    font-size: 14px;
    padding: 8px;
  }
}
</style>
