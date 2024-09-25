<template>
  <div class="layout h-full flex flex-col">
    <div class="flex flex-1 h-full">
      layout
      <div class="flex-1 border bg-gray-50">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, reactive, toRaw } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import { ElMessage } from 'element-plus'
import { getBaseShareUrl } from '@/utils/getShareUrl'

watch(
  () => route.path,
  (toPath) => {
    let routeVal = toRaw(route)
    let query = routeVal.query
    console.log('== watch 路由', routeVal)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.el-menu-item.is-active {
  font-weight: bold;
}
</style>
