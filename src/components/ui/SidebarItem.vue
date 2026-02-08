<template>
  <router-link
    :to="to"
    class="flex items-center gap-3 px-3 py-2 text-white font-medium transition"
    :class="{
      'bg-white/20': isActive,    
      'hover:bg-white/10': !isActive 
    }"
  >
    <i :class="icon + ' text-lg'"></i>
    <span>{{ label }}</span>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  to: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String, required: true }
})

const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>
