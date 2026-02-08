<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-3xl font-bold text-gray-700">
      Lista de Usuarios
    </h1>
    <div class="bg-white rounded-lg shadow p-6 flex flex-col gap-6">
      <div class="users-header flex justify-between items-center">
        <input
          v-model="search"
          type="text"
          placeholder="Buscar usuario..."
          class="search-input"
        />

        <button
          class="create-wrapper"
          @click="showCreate = true"
          aria-label="Crear usuario"
        >
          <img src="@/assets/iconos/mas.png" class="create-icon" />
        </button>
      </div>
      <Loading v-if="isLoading">
        Cargando usuarios...
      </Loading>
      <UserTable
        v-else
        :users="filteredUsers"
        @edit="openEdit"
        @delete="openDelete"
      />
      <NewUser
        v-if="showCreate"
        :users="users"
        @close="showCreate = false"
        @created="addUser"
      />

      <EditUser
        v-if="showEdit"
        :user="selectedUser"
        :users="users"
        :isApiUser="isApiUser"
        @close="showEdit = false"
        @updated="updateUser"
      />

      <ConfirmDelete
        v-if="showDelete"
        :isApiUser="isApiUser"
        @close="showDelete = false"
        @confirm="deleteUser"
      />
    </div>
    <ToastSuccess
      v-if="showToast"
      :message="toastMsg"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import UserTable from './components/table/UserTable.vue'
import EditUser from './components/modals/EditUser.vue'
import NewUser from './components/modals/NewUser.vue'
import ConfirmDelete from './components/modals/ConfirmDelete.vue'
import Loading from '@/components/resources/Loading.vue'
import ToastSuccess from '@/components/ui/ToastSuccess.vue'
import { getUsers } from '@/api/users.api.js'

const users = ref([])
const apiUsers = ref([])
const selectedUser = ref(null)

const showEdit = ref(false)
const showCreate = ref(false)
const showDelete = ref(false)

const showToast = ref(false)
const toastMsg = ref('')
const isLoading = ref(true)
const search = ref('')
const isApiUser = ref(false)

/* Loading - Carga de datos */
onMounted(async () => {
  isLoading.value = true
  const start = Date.now()

  try {
    const res = await getUsers()
    apiUsers.value = res.data || res
    const local = JSON.parse(localStorage.getItem('local_users')) || []
    users.value = [...apiUsers.value, ...local]
  } catch (err) {
    console.error('Error cargando usuarios', err)
  } finally {
    const elapsed = Date.now() - start
    const remaining = 1000 - elapsed

    if (remaining > 0) {
      setTimeout(() => {
        isLoading.value = false
      }, remaining)
    } else {
      isLoading.value = false
    }
  }
})

// Barra de busqueda
const filteredUsers = computed(() => {
  if (!search.value) return users.value
  const term = search.value.toLowerCase()
  return users.value.filter(u =>
    u.name.toLowerCase().includes(term) ||
    u.username.toLowerCase().includes(term)
  )
})

const openEdit = (user) => {
  selectedUser.value = { ...user }
  isApiUser.value = apiUsers.value.some(u => u.id === user.id)
  showEdit.value = true
}
const openDelete = (user) => {
  selectedUser.value = user
  isApiUser.value = apiUsers.value.some(u => u.id === user.id)
  showDelete.value = true
}

// Eliminar (solo localStorage)
const deleteUser = () => {
  let local = JSON.parse(localStorage.getItem('local_users')) || []
  local = local.filter(u => u.id !== selectedUser.value.id)
  localStorage.setItem('local_users', JSON.stringify(local))

  users.value = [...apiUsers.value, ...local]

  showDelete.value = false
  toastMsg.value = 'Usuario eliminado con éxito'
  showToast.value = true
  setTimeout(() => (showToast.value = false), 3000)
}

// Actualizar usuario
const updateUser = (updated) => {
  let local = JSON.parse(localStorage.getItem('local_users')) || []
  const exists = local.find(u => u.id === updated.id)

  if (exists) {
    local = local.map(u => u.id === updated.id ? updated : u)
  } else {
    local.push(updated)
  }

  localStorage.setItem('local_users', JSON.stringify(local))
  users.value = [...apiUsers.value, ...local]

  toastMsg.value = 'Usuario actualizado con éxito'
  showToast.value = true
  setTimeout(() => (showToast.value = false), 3000)
}

// Crear usuario
const addUser = (newUser) => {
  const local = JSON.parse(localStorage.getItem('local_users')) || []
  const maxId = users.value.length
    ? Math.max(...users.value.map(u => Number(u.id)))
    : 0

  const userWithId = { ...newUser, id: maxId + 1 }

  local.push(userWithId)
  localStorage.setItem('local_users', JSON.stringify(local))
  users.value = [...apiUsers.value, ...local]

  toastMsg.value = 'Usuario creado con éxito'
  showToast.value = true
  setTimeout(() => (showToast.value = false), 3000)
}
</script>

<style src="./UserView.css"></style>
