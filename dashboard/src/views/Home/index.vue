<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import CustomHeader from './CustomHeader.vue'
import Contact from './Contact.vue'
import useModal from '@/hooks/use_modal'

export default {
  components: { CustomHeader, Contact },
  setup() {
    const router = useRouter()
    const modal = useModal()

    onMounted(() => {
      const token = window.localStorage.getItem('token')
      if (token) {
        router.push({ name: 'feedbacks' }) // redireciona para feedbacks
      }
    })

    function handleLogin() {
      modal.open({
        component: 'ModalSignIn'
      })
    }

    function handleAccountCreate() {
      modal.open({
        component: 'ModalSignUp'
      })
    }

    return { handleLogin, handleAccountCreate }
  }
}
</script>
<template>
  <custom-header @create-account="handleAccountCreate" @login="handleLogin" />
  <contact />
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">Feedback 2024</p>
  </div>
</template>
