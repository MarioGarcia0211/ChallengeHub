<template>
  <div>
    <h6 class="text-end">Paso 2 de 4</h6>
    <div class="row align-items-center">
      <!-- Nombres -->
      <div class="col-md-6 mb-3">
        <label class="form-label">Nombre(s)</label>
        <input type="text" class="form-control" v-model="form.nombres" />
      </div>

      <!-- Apellidos -->
      <div class="col-md-6 mb-3">
        <label class="form-label">Apellidos</label>
        <input type="text" class="form-control" v-model="form.apellidos" />
      </div>

      <!-- Tipo de documento -->
      <div class="col-md-6 mb-3">
        <label class="form-label">Tipo de Documento</label>
        <select class="form-select" v-model="form.tipoDocumento">
          <option disabled value="">Selecciona un tipo</option>
          <option>Cédula de Ciudadanía</option>
          <option>Tarjeta de Identidad</option>
          <option>Cédula de Extranjería</option>
          <option>Pasaporte</option>
        </select>
      </div>

      <!-- Numero de documento -->
      <div class="col-md-6 mb-3">
        <label class="form-label">Número de documento</label>
        <input
          type="number"
          class="form-control"
          v-model="form.numeroDocumento"
        />
      </div>

      <!-- Foto de perfil -->
      <div class="col-md-12 mb-3">
        <label class="form-label">Foto de perfil</label>
        <input type="file" class="form-control" @change="handleFoto" />
      </div>

      <!-- Ciudad -->
      <div class="col-md-6 mb-3">
        <label class="form-label">Ciudad</label>
        <input type="text" class="form-control" v-model="form.ciudad" />
      </div>

      <!-- Pais -->
      <div class="col-md-6 mb-3">
        <label class="form-label">País</label>
        <select class="form-select" v-model="form.pais">
          <option disabled value="">Selecciona un país</option>
          <option>Colombia</option>
          <option>Argentina</option>
          <option>México</option>
          <option>Perú</option>
          <option>Chile</option>
          <option>Ecuador</option>
        </select>
      </div>
    </div>

    <!-- Botones -->
    <div class="d-flex justify-content-between mt-4">
      <button class="btn btn-secondary" @click="$emit('anterior')">
        Atrás
      </button>
      <button
        class="btn btn-primary"
        :disabled="!form.nombres || !form.apellidos"
        @click="$emit('siguiente')"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "siguiente"]);

const form = reactive({ ...props.modelValue });

watch(
  form,
  () => {
    emit("update:modelValue", form);
  },
  { deep: true }
);

function handleFoto(e) {
  const file = e.target.files[0];
  form.fotoPerfil = file;
}
</script>
