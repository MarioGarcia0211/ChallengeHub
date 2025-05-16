<template>
  <div>
    <h6 class="text-end">Paso 3 de 4</h6>
    <div class="row align-items-center">
      <!-- Descripción -->
      <div class="col-md-12 mb-3">
        <label class="form-label">Descripción</label>
        <textarea class="form-control" v-model="form.descripcion" rows="3" placeholder="Cuéntanos sobre ti"></textarea>
      </div>

      <!-- Tecnologías -->
      <div class="col-md-12 mb-3">
        <label class="form-label">Selecciona las tecnologías que manejas</label>
        <div class="dropdown w-100">
          <div class="form-control dropdown-toggle d-flex justify-content-between align-items-center" type="button"
            data-bs-toggle="dropdown" aria-expanded="false" style="cursor: pointer">
            <span class="text-muted" v-if="form.tecnologias.length === 0">Selecciona tecnologías</span>
            <span v-else>{{ form.tecnologias.join(", ") }}</span>
          </div>
          <ul class="dropdown-menu w-100 shadow-sm" style="max-height: 200px; overflow-y: auto">
            <li v-for="tec in tecnologiasDisponibles" :key="tec">
              <div class="dropdown-item">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" :id="`tec-${tec}`" :value="tec"
                    v-model="form.tecnologias" />
                  <label class="form-check-label" :for="`tec-${tec}`">{{ tec }}</label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Habilidades -->
      <div class="col-md-12 mb-3">
        <label class="form-label">Selecciona tus habilidades</label>
        <div class="dropdown w-100">
          <div class="form-control dropdown-toggle d-flex justify-content-between align-items-center" type="button"
            data-bs-toggle="dropdown" aria-expanded="false" style="cursor: pointer">
            <span class="text-muted" v-if="form.habilidades.length === 0">Selecciona habilidades</span>
            <span v-else>{{ form.habilidades.join(", ") }}</span>
          </div>
          <ul class="dropdown-menu w-100 shadow-sm" style="max-height: 200px; overflow-y: auto">
            <li v-for="hab in habilidadesDisponibles" :key="hab">
              <div class="dropdown-item">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" :id="`hab-${hab}`" :value="hab"
                    v-model="form.habilidades" />
                  <label class="form-check-label" :for="`hab-${hab}`">{{ hab }}</label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Botones -->
    <div class="d-flex justify-content-between mt-4">
      <button class="btn btn-secondary" @click="$emit('anterior')">Atrás</button>
      <button class="btn btn-primary" @click="$emit('siguiente')">Siguiente</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'siguiente', 'anterior'])

const form = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const tecnologiasDisponibles = [
  'HTML', 'CSS', 'JavaScript', 'Vue.js', 'React', 'Angular',
  'Node.js', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Swift', 'Kotlin', 'Dart'
]

const habilidadesDisponibles = [
  'Frontend', 'Backend', 'Fullstack', 'DevOps',
  'Data Science', 'Machine Learning', 'Mobile Development', 'Game Development'
]
</script>