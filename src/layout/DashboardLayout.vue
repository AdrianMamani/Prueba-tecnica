<template>
  <div class="h-screen bg-gray-100">
    <AppHeader @toggle-sidebar="toggleSidebar" />
    <div class="flex h-[calc(100vh-4rem)]">
      <AppSidebar class="hidden lg:flex" />
      <main class="flex-1 p-6 overflow-auto">
        <RouterView />
      </main>
    </div>
    <div
      class="fixed inset-x-0 top-16 bottom-0 z-40 lg:hidden pointer-events-none"
    >
      <div
        v-show="isSidebarOpen"
        class="absolute inset-0 bg-black/40 pointer-events-auto"
        @click="closeSidebar"
      ></div>
      <div
        class="absolute left-0 top-0 h-full z-50
               transform transition-transform duration-300 ease-in-out
               pointer-events-auto"
        :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
        @click.stop
      >
        <AppSidebar />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from './AppHeader.vue'
import AppSidebar from './AppSidebar.vue'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>
