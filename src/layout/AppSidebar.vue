<template>
  <aside
    class="w-52 bg-[#240B5C] flex flex-col h-full
           transform transition-transform duration-300 ease-out"
    :class="open ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="px-6 pt-6 pb-3">
      <p class="text-white/70 text-xs font-semibold uppercase tracking-wider">
        Menu
      </p>
    </div>

    <nav class="flex-1">
      <SidebarItem to="/dashboard" icon="bi-speedometer2" label="Dashboard" />
      <SidebarItem to="/usuarios" icon="bi-people" label="Usuarios" />
      <SidebarItem to="/docs" icon="bi-file-text" label="Documentación" />
      <SidebarItem to="/perfil" icon="bi-person" label="Perfil" />
    </nav>
    <div class="px-6 pb-6">
      <button
        class="w-full flex items-center gap-3 px-4 py-2
               bg-white text-[#240B5C] font-medium
               hover:opacity-90 transition"
      >
        <i class="bi bi-box-arrow-right text-lg"></i>
        <span>Cerrar Sesión</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import SidebarItem from '@/components/ui/SidebarItem.vue'

defineProps({
  open: { type: Boolean, default: true }
})
</script>
