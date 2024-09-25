<template>
  <el-config-provider :locale="locale">
    <component :is="showLayout">
      <slot></slot>
    </component>
  </el-config-provider>
</template>
<script setup>
// 导入layout
import defaultLayout from '@/layouts/default.vue'
import emptyLayout from '@/layouts/empty.vue'
import { shallowRef, onMounted } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const locale = ref(zhCn)
const showLayout = shallowRef(defaultLayout)
const route = useRoute()
const layoutList = { defaultLayout, emptyLayout }

// 判断layout显示
watch(
  () => route.path,
  () => {
    if (route.meta?.layout) {
      let layout = route.meta?.layout
      showLayout.value = layoutList[layout]
    } else {
      showLayout.value = layoutList['defaultLayout']
    }
  },
  { immediate: true }
)

onMounted(() => {})
</script>
