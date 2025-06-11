<template>
  <div class="modal fade show d-block" tabindex="-1" v-if="visible">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Cambiar estado</h5>
          <button
            type="button"
            class="btn-close"
            @click="$emit('cerrar')"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            Cambiar estado de la postulación de
            <strong
              >{{ reto?.datosUsuario?.nombres }}
              {{ reto?.datosUsuario?.apellidos }}</strong
            >
          </p>

          <div class="mb-3">
            <label for="nuevoEstado" class="form-label">Nuevo estado</label>
            <select
              id="nuevoEstado"
              class="form-select"
              v-model="estadoSeleccionado"
            >
              <option disabled value="">Seleccione un estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="aceptado">Aceptado</option>
              <option value="rechazado">Rechazado</option>
              <option value="en proceso">En proceso</option>
              <option value="en revision">En revisión</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="$emit('cerrar')">
            Cancelar
          </button>
          <button
            class="btn btn-primary"
            :disabled="!estadoSeleccionado"
            @click="cambiarEstado"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  visible: Boolean,
  reto: Object,
});

const emit = defineEmits(["cerrar", "guardar"]);

const estadoSeleccionado = ref("");

watch(
  () => props.reto,
  (nuevo) => {
    estadoSeleccionado.value = nuevo?.estado || "";
  },
  { immediate: true }
);

const cambiarEstado = () => {
  if (!estadoSeleccionado.value) return;
  emit("guardar", {
    ...props.reto,
    nuevoEstado: estadoSeleccionado.value,
  });
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
