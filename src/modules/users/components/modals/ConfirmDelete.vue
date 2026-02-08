<template>
  <div class="modal-overlay">
    <div class="modal-box text-center">
      <div class="icon-wrapper">
        <i class="bi bi-exclamation-triangle"></i>
      </div>
      <h2 class="text-xl font-bold text-gray-800 mt-4">
        {{ isApiUser
          ? 'Acción no permitida'
          : '¿Seguro de eliminar al usuario?' }}
      </h2>
      <p class="text-sm text-gray-500 mt-2">
        {{ isApiUser
          ? 'Dato no posible de eliminar'
          : 'Esta acción no se puede deshacer' }}
      </p>
      <div class="flex justify-center gap-4 mt-6">
        <button
          class="btn-cancel"
          @click="$emit('close')"
        >
          Cancelar
        </button>

        <button
          v-if="!isApiUser"
          class="btn-delete"
          @click="$emit('confirm')"
        >
          Eliminar
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  isApiUser: {
    type: Boolean,
    default: false
  }
})
</script>

<style src="./css/DeleteUser.css"></style>