<script>
import Loading from './Loading.vue'
export default {
  props: {
    components: { Loading },
    name: { type: String, required: true }
  }
}
</script>

<template>
  <component :is="name" v-bind="$props" />
</template>
