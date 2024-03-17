<script>
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: '',
        errorMessage: ''
      },
      password: {
        value: '',
        errorMessage: ''
      }
    })

    return { state }
  }
}
</script>
<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black">Entre na sua conta</h1>
  </div>
</template>
