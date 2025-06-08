<template>
  <Navbar />
  <div class="cont-fluid mt-3">
    <!-- Company Card -->
    <CompanyCard :empresa="empresa" />

    <!-- Company Tabs -->
    <CompanyTabs />

    <!-- Contenido dinámico -->
    <div class="mt-3">
      <router-view :empresa="empresa" />
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { obtenerDatosUsuario } from "../services/userServices";
import Navbar from "../components/Navbar/Navbar.vue";
import Footer from "../components/Footer/Footer.vue";
import CompanyCard from "../components/CompanyProfile/CompanyCard.vue";
import CompanyTabs from "../components/CompanyProfile/CompanyTabs.vue";

const empresa = ref({
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
});

onMounted(async () => {
  try {
    empresa.value = await obtenerDatosUsuario();
    console.log("Datos del empresa:", empresa.value);
  } catch (error) {
    console.error("Error cargando empresa:", error);
  }
});
</script>
