<template>
  <ul class="nav nav-pills user-tabs">
    <li v-for="tab in tabs" :key="tab.label" class="nav-item">
      <router-link
        :to="tab.route"
        class="nav-link"
        :class="{ active: $route.path === tab.route }"
      >
        <i :class="tab.icon" class="me-1"></i>
        {{ tab.label }}
      </router-link>
    </li>
  </ul>
</template>

<script setup>
const tabs = [
  {
    label: "Perfil",
    icon: "bi bi-person-check",
    route: "/perfil",
  },
  {
    label: "Retos",
    icon: "bi bi-flag-fill",
    route: "/perfil/retos",
  },
  {
    label: "Vacantes",
    icon: "bi bi-briefcase",
    route: "/perfil/vacantes",
  },
  {
    label: "Candidatos",
    icon: "bi bi-people-fill",
    route: "/perfil/conexiones",
  },
];
</script>

<style scoped>
.user-tabs {
  margin-top: 1rem;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.user-tabs .nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #6b7280; /* text-muted */
  transition: all 0.2s;
}
.user-tabs .nav-link.active {
  background-color: #3b82f6;
  color: white;
}
.user-tabs .nav-link:hover {
  background-color: #e5e7eb;
  color: #111827;
}
</style>
