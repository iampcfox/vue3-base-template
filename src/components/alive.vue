<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="data.includeList">
      <component :is="Component"></component>
    </KeepAlive>
  </RouterView>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { reactive, watch } from 'vue'
const route = useRoute()
const data = reactive({
  includeList: [] // 需要缓存的组件name数组
})
watch(
  () => route,
  (val) => {
    if (val.meta.keepAlive && data.includeList.indexOf(val.name) == -1) {
      data.includeList.push(val.name)
    }
  },
  { deep: true }
)
</script>
