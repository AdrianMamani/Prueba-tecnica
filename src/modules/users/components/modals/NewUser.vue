<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold">
          Agregar usuario
        </h2>
        <p class="text-gray-500 text-sm sm:text-base mt-3">
          Detalles de usuario
        </p>
      </div>
      <form @submit.prevent="submit" class="space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="label">Nombre</label>
            <input v-model="form.name" required class="input" />
          </div>

          <div>
            <label class="label">Usuario</label>
            <input v-model="form.username" required class="input" />
          </div>
        </div>
        <div>
          <label class="label">Email</label>

          <div class="relative">
            <input
              v-model="form.email"
              type="text"
              required
              placeholder="Ejm: email@gmail.com"
              class="input pr-10"
            />

            <span
              v-if="form.email"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
            >
              <i
                v-if="emailInvalid || emailExists"
                class="bi bi-x-circle-fill text-red-500"
              ></i>

              <i
                v-else
                class="bi bi-check-circle-fill text-green-500"
              ></i>
            </span>
          </div>

          <p v-if="emailExists" class="text-red-500 text-sm mt-1">
            Este correo ya está registrado
          </p>

          <p v-else-if="emailInvalid" class="text-red-500 text-sm mt-1">
            Ingresa un correo válido
          </p>
        </div>
        <div>
          <label class="label">Teléfono</label>
          <input v-model="form.phone" required class="input" />
        </div>
        <div class="flex justify-end gap-3 pt-6">
          <button
            type="button"
            class="btn-cancel action-btn"
            @click="$emit('close')"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="btn-save action-btn"
            :disabled="emailInvalid || emailExists"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useEmailValidation } from '@/composables/useEmailValidation'

const emit = defineEmits(['close', 'created'])

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
})

const form = ref({
  name: '',
  username: '',
  email: '',
  phone: ''
})

const usersRef = computed(() => props.users)

const { emailInvalid, emailExists } = useEmailValidation(
  form,
  usersRef
)
onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const submit = () => {
  if (emailInvalid.value || emailExists.value) return

  emit('created', {
    ...form.value,
    email: form.value.email.trim().toLowerCase()
  })

  emit('close')
}
</script>

<style src="./css/NewUser.css"></style>
