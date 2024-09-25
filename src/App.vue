<template>
  <RouterView></RouterView>
</template>

<script setup>
// import { useSystemStore } from '@/stores/system'
// const systemStore = useSystemStore()
// setMetaTitle({
//   title: '公共服务平台'
// })
onMounted(() => {})
</script>

<style lang="scss">
:root {
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

.selected-component-outline-color {
  outline-color: #0ea5e9 !important;
}

.dragGhost {
  opacity: 0.5;
  background: #c8ebfb;
}

/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  background: transparent;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track {
  // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: transparent;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  // background-color: transparent;
  background-color: #c8c9cc;
  cursor: pointer;
  transition: 0.3s;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #c8c9cc;
}

.el-popper .el-form-item__label {
  font-weight: bold;
}
</style>
