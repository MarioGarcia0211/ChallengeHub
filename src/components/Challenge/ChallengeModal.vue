<template>
  <div
    v-if="visible"
    class="modal fade show"
    tabindex="-1"
    style="display: block; background-color: rgba(0, 0, 0, 0.5)"
    @click.self="cerrarModal"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ reto.nombreReto }}</h5>
          <button type="button" class="btn-close" @click="cerrarModal" />
        </div>

        <div class="modal-body">
          <p><strong>Empresa:</strong> {{ reto.empresa.nombreEmpresa }}</p>
          <p><strong>Descripción:</strong> {{ reto.descripcion }}</p>

          <p><strong>Lenguajes:</strong></p>
          <ul>
            <li v-for="(lang, index) in reto.lenguajes" :key="'lang-' + index">
              {{ lang }}
            </li>
          </ul>

          <p><strong>Tecnologías:</strong></p>
          <ul>
            <li v-for="(tec, index) in reto.tecnologias" :key="'tec-' + index">
              {{ tec }}
            </li>
          </ul>

          <p><strong>Programación:</strong></p>
          <ul>
            <li
              v-for="(prog, index) in reto.programacion"
              :key="'prog-' + index"
            >
              {{ prog }}
            </li>
          </ul>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="cerrarModal">Cerrar</button>
          <button class="btn btn-primary">Participar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
  reto: Object,
});

const emit = defineEmits(["cerrar"]);

const cerrarModal = () => {
  emit("cerrar");
};
</script>
