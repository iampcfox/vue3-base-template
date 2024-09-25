<template>
  <div class="w-full h-screen flex items-center justify-center">
    <el-empty description="页面不存在">
      <el-button @click="router.push('/home')" type="primary">返回首页</el-button>
    </el-empty>
    <!-- <router-link to="/home">返回首页</router-link> -->
  </div>
</template>
<script setup>
const router = useRouter()
setMetaTitle()

</script>
