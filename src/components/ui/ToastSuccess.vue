<template>
  <transition name="toast">
    <div v-if="message" class="toast-success">
      <i class="bi bi-check-circle-fill"></i>
      <span>{{ message }}</span>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Operación exitosa'
  }
})
</script>

<style scoped>
.toast-success {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #16a34a;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  font-size: 0.9rem;
}

/* Animación */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
