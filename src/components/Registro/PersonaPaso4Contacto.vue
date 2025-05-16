<template>
  <div>
    <h6 class="text-end">Paso 4 de 4</h6>
    <div class="row align-items-center">
      <!-- Recursos -->
      <div class="col-md-12 mb-3">
        <label class="form-label">¿Qué recursos tienes?</label>
        <div class="row">
          <div class="col-md-12 col-sm-6" v-for="recurso in recursosDisponibles" :key="recurso">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :id="`rec-${recurso}`" :value="recurso"
                v-model="form.recursos" />
              <label class="form-check-label" :for="`rec-${recurso}`">{{ recurso }}</label>
            </div>
          </div>
        </div>
      </div>

      <!-- Preferencias de trabajo -->
      <div class="col-md-6 mb-3">
        <label class="form-label">¿Dónde te gustaría trabajar?</label>
        <div class="dropdown w-100">
          <div class="form-control dropdown-toggle d-flex justify-content-between align-items-center" type="button"
            data-bs-toggle="dropdown" aria-expanded="false" style="cursor: pointer">
            <span class="text-muted" v-if="form.preferenciasTrabajo.length === 0">
              Selecciona dónde te gustaría trabajar
            </span>
            <span v-else>{{ form.preferenciasTrabajo.join(", ") }}</span>
          </div>
          <ul class="dropdown-menu w-100 shadow-sm" style="max-height: 200px; overflow-y: auto">
            <li v-for="preferenciaTrabajo in preferenciasTrabajoDisponibles" :key="preferenciaTrabajo">
              <div class="dropdown-item">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" :id="`rec-${preferenciaTrabajo}`"
                    :value="preferenciaTrabajo" v-model="form.preferenciasTrabajo" />
                  <label class="form-check-label" :for="`rec-${preferenciaTrabajo}`">
                    {{ preferenciaTrabajo }}
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Hoja de vida -->
      <div class="col-md-6 mb-3">
        <label class="form-label">Hoja de vida</label>
        <input type="file" class="form-control" @change="handleHV" />
      </div>

      <!-- WhatsApp -->
      <div class="col-md-6 mb-3">
        <label for="whatsapp" class="form-label">WhatsApp</label>
        <input id="whatsapp" type="text" class="form-control" placeholder="+57" v-model="form.whatsapp" required />
      </div>

      <!-- Correo -->
      <div class="col-md-6 mb-3">
        <label for="correo" class="form-label">Correo electrónico</label>
        <input id="correo" type="email" class="form-control" v-model="form.correo" required />
      </div>

      <!-- Contraseña -->
      <div class="col-md-6 mb-3">
        <label for="contrasena" class="form-label">Contraseña</label>
        <input id="contrasena" type="password" class="form-control" v-model="form.contrasena" required />
      </div>

      <!-- Confirmar contraseña -->
      <div class="col-md-6 mb-3">
        <label for="confirmarContrasena" class="form-label">Confirmar contraseña</label>
        <input id="confirmarContrasena" type="password" class="form-control" v-model="form.confirmarContrasena"
          :class="{ 'is-invalid': contrasenasNoCoinciden }" required />
        <div class="invalid-feedback" v-if="contrasenasNoCoinciden">
          Las contraseñas no coinciden.
        </div>
      </div>

    </div>

    <div class="d-flex justify-content-between">
      <button class="btn btn-secondary" @click="$emit('anterior')">Atrás</button>
      <button class="btn btn-primary" @click="enviarFormulario" :disabled="!formularioValido">
        Registrarse
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'enviar', 'anterior'])

const form = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const preferenciasTrabajoDisponibles = [
  "Startup", "Empresa", "Gobierno"
];

const recursosDisponibles = ['PC', 'Internet']

const formularioValido = computed(() => {
  return (
    form.value.whatsapp.trim() !== '' &&
    form.value.correo.includes('@') &&
    form.value.contrasena.length >= 6 &&
    form.value.contrasena === form.value.confirmarContrasena
  )
})

const contrasenasNoCoinciden = computed(() => {
  return (
    form.value.confirmarContrasena &&
    form.value.contrasena !== form.value.confirmarContrasena
  )
})


function handleHV(e) {
  const file = e.target.files[0];
  form.hojaDeVida = file;
}

function enviarFormulario() {
  emit('enviar')
}
</script>
