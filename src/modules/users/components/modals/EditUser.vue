<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useEmailValidation } from '@/composables/useEmailValidation'

const emit = defineEmits(['close', 'updated'])

const props = defineProps({
  user: { type: Object, required: true },
  users: { type: Array, required: true },
  isApiUser: { type: Boolean, default: false }
})

const form = ref({ ...props.user })

const { emailInvalid, emailExists } = useEmailValidation(
  form,
  ref(props.users),
  {
    ignoreEmail: props.user.email?.toLowerCase(),
    disabled: props.isApiUser
  }
)

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const submit = () => {
  if (props.isApiUser || emailInvalid.value || emailExists.value) return

  emit('updated', {
    ...form.value,
    email: form.value.email.trim().toLowerCase()
  })

  emit('close')
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">

      <div class="mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold">
          Editar usuario
        </h2>
        <p class="text-gray-500 text-sm sm:text-base mt-3">
          Detalles de usuario
        </p>
      </div>

      <form @submit.prevent="submit" class="space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label class="label">Nombre</label>
            <input v-model="form.name" class="input" required :disabled="isApiUser" />
          </div>

          <div>
            <label class="label">Usuario</label>
            <input v-model="form.username" class="input" required :disabled="isApiUser" />
          </div>
        </div>
        <div>
          <label class="label">Email</label>

          <div class="relative">
            <input
              v-model="form.email"
              type="text"
              class="input pr-10"
              required
              :disabled="isApiUser"
            />
            <span
              v-if="form.email && !isApiUser"
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
            <span
              v-if="isApiUser"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
            >
              <i class="bi bi-lock-fill"></i>
            </span>
          </div>
          <p v-if="isApiUser" class="text-red-500 text-sm mt-1">
            Este usuario es de la API y no se puede editar
          </p>
          <p v-else-if="emailExists" class="text-red-500 text-sm mt-1">
            Este correo ya está registrado
          </p>
          <p v-else-if="emailInvalid" class="text-red-500 text-sm mt-1">
            Ingresa un correo válido
          </p>
        </div>
        <div>
          <label class="label">Teléfono</label>
          <input v-model="form.phone" class="input" required :disabled="isApiUser" />
        </div>
        <div class="flex justify-end gap-3 pt-6">
          <button type="button" class="btn-cancel action-btn" @click="$emit('close')">
            Cancelar
          </button>
          <button
            type="submit"
            class="btn-save action-btn"
            :disabled="isApiUser || emailInvalid || emailExists"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style src="./css/NewUser.css"></style>
