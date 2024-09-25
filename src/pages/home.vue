<template>
  <Application>
    <Alive></Alive>
  </Application>
</template>

<script setup>
import Application from '@/components/Application.vue'
import Alive from '@/components/alive.vue'
import { useSystemStore } from '@/stores/system'
const systemStore = useSystemStore()
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
// setMetaTitle({
//   title: '公共服务平台'
// })
onMounted(() => {
  document.title = systemStore.systemInfo.title
})
</script>
