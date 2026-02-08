<template>
  <div class="flex flex-col gap-4">
    <div class="overflow-x-auto relative">
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="px-4 py-4 text-left text-sm font-medium">ID</th>
            <th class="px-4 py-4 text-left text-sm font-medium">Nombre</th>
            <th class="px-4 py-4 text-left text-sm font-medium">Usuario</th>
            <th class="px-4 py-4 text-left text-sm font-medium">Email</th>
            <th class="px-4 py-4 text-left text-sm font-medium">Teléfono</th>
            <th class="px-4 py-4 text-center text-sm font-medium">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in paginatedUsers"
            :key="user.id"
            class="hover-row"
          >
            <td class="px-4 py-4">{{ user.id }}</td>
            <td class="px-4 py-4">{{ user.name }}</td>
            <td class="px-4 py-4">{{ user.username }}</td>
            <td class="px-4 py-4">{{ user.email }}</td>
            <td class="px-4 py-4">{{ user.phone }}</td>
            <td class="px-4 py-4 flex justify-center gap-3">
              <button
                class="action-btn"
                type="button"
                @click="emit('edit', user)"
                aria-label="Editar usuario"
              >
                <img src="@/assets/iconos/editar.png" alt="Editar" />
              </button>
              <button
                class="action-btn"
                type="button"
                @click="emit('delete', user)"
                aria-label="Eliminar usuario"
              >
                <img src="@/assets/iconos/borrar.png" alt="Eliminar" />
              </button>
            </td>
          </tr>

          <tr v-if="users.length === 0">
            <td colspan="6" class="text-center py-6">
              No hay usuarios
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="pagination-container">
        <button
          class="pagination-arrow"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          <i class="bi bi-arrow-left"></i>
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          class="pagination-page"
          :class="{ active: currentPage === page }"
          @click="currentPage = page"
        >
          {{ page }}
        </button>

        <button
          class="pagination-arrow"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
const emit = defineEmits(['edit', 'delete'])
const props = defineProps({
  users: { type: Array, required: true }
})

const currentPage = ref(1)
const perPage = 10
const sortedUsers = computed(() =>
  [...props.users].sort((a, b) => Number(a.id) - Number(b.id))
)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(sortedUsers.value.length / perPage))
)

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return sortedUsers.value.slice(start, start + perPage)
})

watch(
  () => props.users.length,
  () => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value
    }
  }
)
</script>

<style src="./css/UserTable.css" scoped></style>
