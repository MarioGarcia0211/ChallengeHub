<template></template>
<script setup>
import Swal from "sweetalert2";

const mostrarToast = (icono, titulo, texto = "", clase = "") => {
  Swal.fire({
    toast: true,
    icon: icono,
    title: titulo,
    text: texto,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    showCloseButton: true,
    customClass: {
      popup: clase,
    },
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

defineExpose({
  mostrarToast,
});
</script>
