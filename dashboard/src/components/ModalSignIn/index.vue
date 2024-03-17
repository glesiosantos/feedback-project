<script>
import { reactive } from 'vue'
import { useField } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import useModal from '@/hooks/use_modal'
import { validateEmptyAndEmail, validateEmptyAndLength3 } from '@/utils/validator'
import services from '@/services'

export default {
  setup() {
    const toast = useToast()
    const modal = useModal()
    const router = useRouter()
    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      'email',
      validateEmptyAndEmail
    )
    const { value: passwordValue, errorMessage: passwordErrorMessage } = useField(
      'password',
      validateEmptyAndLength3
    )

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function handleSubmit() {
      try {
        toast.clear()
        state.isLoading = true
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          window.localStorage.setItem('token', data.token)
          router.push({ name: 'feedbacks' })
          state.isLoading = false
          modal.close()
          return
        }

        console.log('**** status', errors.status)

        if (errors.status === 404) {
          toast.error('E-mail não encontrado')
        }
        if (errors.status === 401) {
          toast.error('Email/ Password invalidos')
        }
        if (errors.status === 400) {
          toast.error('Ocorreu um error ao fazer um login')
        }

        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Ocorreu inesperado, falar com administrador do sistema')
      }
    }

    return { state, close: modal.close, handleSubmit }
  }
}
</script>
<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>
    <button class="text-4xl text-gray-600 focus:outline-none" @click="close">&times;</button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          type="email"
          v-model="state.email.value"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{ 'border-brand-danger': !!state.email.errorMessage }"
          placeholder="jane.dae@gmail.com"
        />
        <span v-if="!!state.email.errorMessage" class="block font-medium text-brand-danger">{{
          state.email.errorMessage
        }}</span>
      </label>

      <label class="block mt-5">
        <span class="text-lg font-medium text-gray-800">Password</span>
        <input
          type="password"
          v-model="state.password.value"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{ 'border-brand-danger': !!state.password.errorMessage }"
          placeholder="jane.dae@gmail.com"
        />
        <span v-if="!!state.password.errorMessage" class="block font-medium text-brand-danger">{{
          state.password.errorMessage
        }}</span>
      </label>

      <button
        :disabled="state.isLoading"
        type="submit"
        :class="{ 'opacity-50': !!state.isLoading }"
        class="px-8 py-3 mt-10 font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        Entrar
      </button>
    </form>
  </div>
</template>
