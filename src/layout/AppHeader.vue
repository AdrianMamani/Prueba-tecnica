<template>
  <header class="h-16 bg-white flex items-center justify-between px-6">
    <div class="flex items-center">
      <img
        src="@/assets/logo.png"
        alt="Logo"
        class="h-8 object-contain"
      />
    </div>
    <div class="hidden lg:flex items-center gap-3">
      <span class="text-sm text-gray-600">
        <strong>Adrian Mamani</strong>  
      </span>
      <div class="w-8 h-8 rounded-full bg-gray-300"></div>
    </div>

    <button
      class="lg:hidden text-gray-700 text-2xl"
      @click="$emit('toggle-sidebar')"
    >
      <i class="bi bi-list"></i>
    </button>
  </header>
</template>

<script setup></script>
