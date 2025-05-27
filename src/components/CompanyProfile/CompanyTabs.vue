<template>
  <ul class="nav nav-pills user-tabs">
    <li v-for="tab in tabs" :key="tab.label" class="nav-item">
      <router-link
        :to="tab.route"
        class="nav-link"
        :class="{ active: $route.path.startsWith(tab.route) }"
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
    route: "/company-profile/profile",
  },
  {
    label: "Retos",
    icon: "bi bi-flag-fill",
    route: "/company-profile/challenge",
  },
  {
    label: "Vacantes",
    icon: "bi bi-briefcase",
    route: "/company-profile/vacantes",
  },
  {
    label: "Candidatos",
    icon: "bi bi-people-fill",
    route: "/company-profile/candidatos",
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
  color: #6b7280; /* gris oscuro (text-muted) */
  transition: all 0.2s;
  border-radius: 0.5rem;
}

.user-tabs .nav-link.active {
  background-color: #8b5cf6; /* violeta */
  color: white;
}

.user-tabs .nav-link:hover {
  background-color: #ede9fe; /* violeta muy claro */
  color: #6b21a8; /* violeta oscuro */
}

.user-tabs .nav-link.active {
  background-color: #8b5cf6;
  color: white;
  font-weight: 600;
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
}
</style>
