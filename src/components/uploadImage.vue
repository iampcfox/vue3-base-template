<template>
  <el-upload
    class="avatar-uploader group overflow-hidden"
    :action="api"
    :headers="{
      codePlatformAccessKey: accessKey
    }"
    :show-file-list="false"
    :on-success="handleSuccess"
    :on-error="handleError"
    :before-upload="beforeUpload"
    :disabled="disabled"
  >
    <div class="relative">
      <el-tooltip content="点击这里上传图片" placement="bottom" effect="light" v-if="imageUrl">
        <img :src="imageUrl" class="avatar" title="点击这里上传图片" alt="点击这里上传图片" />
      </el-tooltip>
      <div class="avatar-uploader-icon flex flex-col justify-center items-center" v-else>
        <el-icon size="30"><Plus /></el-icon>
        <div class="mt-5" v-if="isUploading">上传中...</div>
        <div class="mt-5" v-else>点击这里上传图片</div>
      </div>
      <div
        class="absolute top-2 right-2 z-10 flex opacity-20 group-hover:opacity-100 duration-200"
        v-if="imageUrl"
      >
        <div
          class="ml-2 p-1 bg-white rounded shadow hover:shadow-lg duration-200 outline-sky-400 hover:outline leading-tight"
          @click.stop="
            () => {
              viewerApi({
                options: {
                  toolbar: true,
                  initialViewIndex: 0,
                  zIndex: 9999
                },
                images: [imageUrl]
              })
            }
          "
          title="预览"
        >
          <el-button :icon="View" link />
        </div>
        <el-popconfirm
          title="是否删除？"
          @confirm="
            () => {
              console.log('删除操作')
              deleteImage(imageUrl)
              imageUrl = ''
              emit('update:value', imageUrl)
            }
          "
        >
          <template #reference>
            <div
              v-if="!disabled"
              class="ml-2 p-1 bg-white rounded shadow hover:shadow-lg duration-200 outline-sky-400 hover:outline leading-tight"
              @click.stop="() => {}"
              title="删除"
            >
              <el-button :icon="Delete" link />
            </div>
          </template>
        </el-popconfirm>
      </div>
    </div>
  </el-upload>
  <div class="text-gray-400" v-if="!disabled && showTip">
    <div class="text-xs mt-1">格式只支持 {{ format.join('/') }}</div>
    <div class="text-xs mt-1">文件大小≤ {{ size }}MB</div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Delete, View } from '@element-plus/icons-vue'
import 'viewerjs/dist/viewer.css'
import { api as viewerApi } from 'v-viewer'
import request from '@/request/index'

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  needInitValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  showTip: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:value', 'onSuccess'])
let accessKey = localStorage['accessKey']
onMounted(() => {
  // console.log('upload 赋值', props.value, 'needInitValue', props.needInitValue)
  if (props.value && props.needInitValue) {
    imageUrl.value = props.value
  }
})

watch(
  () => props.value,
  (newVal) => {
    // console.log('upload 更新', newVal)

    if (!newVal) {
      imageUrl.value = ''
    } else {
      imageUrl.value = newVal
    }
  }
)

const api = import.meta.env.VITE_BASE_URL + '/codePlatform/uploadFiles'
let isUploading = ref(false)
const format = ['jpg', 'jpeg', 'png']
const size = 2 // 单位：MB
const imageUrl = ref('')
const handleSuccess = (response, uploadFile) => {
  console.log('response', response)
  isUploading.value = false
  if (response && response.data && response.data.filePath) {
    imageUrl.value = response.data.filePath
    emit('update:value', imageUrl.value)
    emit('onSuccess')
  } else {
    ElMessage.error('上传失败')
  }
}

const handleError = (error, uploadFile) => {
  console.log('error', error)
  ElMessage.error('上传错误，请联系管理员')
  isUploading.value = false
}

const beforeUpload = (rawFile) => {
  console.log('=== rawFile', rawFile)
  if (isUploading.value) {
    ElMessage.error(`图片上传中，请稍等...`)
    return false
  }
  if (rawFile.type === 'image/jpeg' || rawFile.type === 'image/png') {
  } else {
    ElMessage.error(`图片后缀格式支持 ${format.join('/')}`)
    return false
  }
  if (rawFile.size / 1024 / 1024 > size) {
    ElMessage.error(`图片不能超过 ${size}MB`)
    return false
  }
  isUploading.value = true

  if (imageUrl.value) {
    deleteImage(imageUrl.value)
    imageUrl.value = ''
  }
  return true
}

const deleteImage = (url) => {
  request({
    url: '/codePlatform/deleteFile',
    method: 'POST',
    data: [url]
  }).then((res) => {
    console.log('删除图片', res)
    if (res.code === 200) {
      // ElMessage.success(`操作成功`)
    }
  })
}

defineExpose({
  imageUrl: imageUrl.value
})
</script>
<style scoped>
.avatar-uploader,
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: 0.2s;
}

.avatar-uploader:hover {
  border-color: #0ea5e9;
}

.avatar-uploader .el-upload {
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
