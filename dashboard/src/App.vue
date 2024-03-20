<script>
import { watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ModalFactory from '@/components/ModalFactory/index.vue'
import services from '@/services'
import {} from '@/stores/index'
import { setCurrentUser } from './stores/user.store'

export default {
  components: { ModalFactory },
  setup() {
    const router = useRouter() // ações
    const route = useRoute() // pega as informações da rota

    watch(
      () => route.path,
      async () => {
        if (route.meta.hasAuth) {
          const token = window.localStorage.getItem('token')

          if (!token) {
            router.push({ name: 'home' })
            return
          }

          const { data } = await services.auth.user.getMe()
          setCurrentUser(data)
        }
      }
    )
  }
}
</script>

<template>
  <modal-factory />
  <router-view />
</template>
