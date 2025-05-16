<template>
  <div>
    <h6 class="text-end">Paso 1 de 4</h6>
    <label class="form-label">Selecciona el tipo de usuario</label>
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        value="persona"
        v-model="tipo"
        id="persona"
      />
      <label class="form-check-label" for="persona">Persona</label>
    </div>

    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        value="empresa"
        v-model="tipo"
        id="empresa"
      />
      <label class="form-check-label" for="empresa">Empresa</label>
    </div>

    <div class="d-flex justify-content-end mt-3">
      <button
        class="btn btn-primary"
        :disabled="!tipo"
        @click="emitirSeleccion"
      >
        Continuar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['seleccionar-tipo'])
const tipo = ref('')

const emitirSeleccion = () => {
  emit('seleccionar-tipo', tipo.value)
}
</script>