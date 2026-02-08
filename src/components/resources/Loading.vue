<template>
  <div class="loading-container">
    <div class="spinner"></div>
    <p class="loading-text">
      <slot>Cargando información...</slot>
    </p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  gap: 0.75rem;
  color: #374151;
}

.spinner {
  width: 38px;
  height: 38px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #099c15;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  font-size: 0.9rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
