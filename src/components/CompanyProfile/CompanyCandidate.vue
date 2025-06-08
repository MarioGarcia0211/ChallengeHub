<template>
  <div>
    <!-- Tabs de navegación -->
    <ul class="nav nav-tabs custom-tabs">
      <li class="nav-item" v-for="tab in tabs" :key="tab.name">
        <button
          class="nav-link"
          :class="['tab-' + tab.name, { active: activeTab === tab.name }]"
          @click="activeTab = tab.name"
        >
          {{ tab.label }}
        </button>
      </li>
    </ul>

    <!-- Contenedor de componente dinámico -->
    <div class="mt-3">
      <component :is="getComponent(activeTab)" :empresa="empresa" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Pendiente from "../CompanyTabsCandidate/Pendiente.vue";

// Lista de tabs con nombre e identificación
const tabs = [
  { name: "pendientes", label: "Pendientes" },
  { name: "revision", label: "En revisión" },
  { name: "proceso", label: "En proceso" },
  { name: "aceptado", label: "Aceptado" },
  { name: "rechazado", label: "Rechazado" },
];

const props = defineProps({
  empresa: Object,
});

// Tab activa por defecto
const activeTab = ref("pendientes");

// Retorna el componente que debe mostrarse
const getComponent = (tab) => {
  switch (tab) {
    case "pendientes":
      return Pendiente;
    case "revision":
      return Revision;
    case "proceso":
      return Proceso;
    case "aceptado":
      return Aceptado;
    case "rechazado":
      return Rechazado;
    default:
      return Pendiente;
  }
};
</script>
<style scoped>
.custom-tabs .nav-link {
  color: #6b7280; /* gris neutro */
  font-weight: 500;
  border: none;
  background-color: transparent;
  transition: all 0.3s ease;
}

.custom-tabs .nav-link.active {
  color: white;
  border-radius: 8px 8px 0 0;
}

/* Colores personalizados para cada tab activo */
.custom-tabs .tab-pendientes.active {
  background-color: #f97316;
}
.custom-tabs .tab-revision.active {
  background-color: #06b6d4;
}
.custom-tabs .tab-proceso.active {
  background-color: #8b5cf6;
}
.custom-tabs .tab-aceptado.active {
  background-color: #22c55e;
}
.custom-tabs .tab-rechazado.active {
  background-color: #374151;
}
</style>
