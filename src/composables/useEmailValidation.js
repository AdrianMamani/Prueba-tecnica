import { ref, watch } from 'vue'

export function useEmailValidation(form, users, options = {}) {
  const emailInvalid = ref(false)
  const emailExists = ref(false)

  const {
    ignoreEmail = null,   // email original 
    disabled = false
  } = options

  watch(
    () => form.value.email,
    (email) => {
      if (!email || disabled) {
        emailInvalid.value = false
        emailExists.value = false
        return
      }

      const normalizedEmail = email.trim().toLowerCase()

      /* Duplicado (omite el correo del usuario) */
      emailExists.value = users.value.some(u => {
        const uEmail = u.email?.toLowerCase()
        if (!uEmail) return false
        if (ignoreEmail && uEmail === ignoreEmail) return false
        return uEmail === normalizedEmail
      })

      if (emailExists.value) {
        emailInvalid.value = false
        return
      }

      /* Formato */
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      emailInvalid.value = !emailRegex.test(normalizedEmail)
    },
    { immediate: true }
  )

  return {
    emailInvalid,
    emailExists
  }
}
