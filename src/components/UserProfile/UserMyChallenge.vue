<template>
  <div>
    <!-- Tabs de navegación -->
    <ul class="nav nav-tabs">
      <li class="nav-item" v-for="tab in tabs" :key="tab.name">
        <button
          class="nav-link"
          :class="{ active: activeTab === tab.name }"
          @click="activeTab = tab.name"
        >
          {{ tab.label }}
        </button>
      </li>
    </ul>

    <!-- Contenedor de componente dinámico -->
    <div class="mt-3">
      <component :is="getComponent(activeTab)" :persona="persona" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Importa tus componentes
import Pendiente from "../UserTabsChallenge/Pendiente.vue";
import Revision from "../UserTabsChallenge/Revision.vue";
import Proceso from "../UserTabsChallenge/Proceso.vue";
import Aceptado from "../UserTabsChallenge/Aceptado.vue";
import Rechazado from "../UserTabsChallenge/Rechazado.vue";

// Lista de tabs con nombre e identificación
const tabs = [
  { name: "pendientes", label: "Pendientes" },
  { name: "revision", label: "En revisión" },
  { name: "proceso", label: "En proceso" },
  { name: "aceptado", label: "Aceptado" },
  { name: "rechazado", label: "Rechazado" },
];

const props = defineProps({
  persona: Object,
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
