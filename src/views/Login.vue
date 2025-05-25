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
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { iniciarSesion } from "../services/authServices";

const correo = ref("");
const clave = ref("");
const router = useRouter();

const login = async () => {
  if (!correo.value || !clave.value) {
    alert("Todos los campos son obligatorios");
    return;
  }

  try {
    const usuario = await iniciarSesion(correo.value, clave.value);
    console.log("Usuario autenticado:", usuario);
    router.push("/inicio");
  } catch (error) {
    console.log("Error al iniciar sesión:", error);
  }
};
</script>

<style>
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
