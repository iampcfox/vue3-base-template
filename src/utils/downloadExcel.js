import axios from '@/request'
import { ElMessage } from 'element-plus'

export default ({ url = '/', filename = '模拟文件名', data }) => {
  ElMessage('开始下载文件，请稍候')
  return axios
    .get(url, {
      params: data,
      responseType: 'blob'
    })
    .then((res) => {
      // console.log(res);
      if (!res) {
        ElMessage.error('下载文件失败')
        return false
      }

      const link = document.createElement('a')
      const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
      // console.log('blob', blob);
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', `${filename}.xlsx`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
    .catch((err) => {
      ElMessage.error('下载文件错误：' + err)
    })
}

export const downloadExcelByPost = ({ url = '/', filename = '模拟文件名', data }) => {
  ElMessage('开始下载文件，请稍候')
  return axios
    .post(url, data, {
      responseType: 'blob'
    })
    .then((res) => {
      // console.log(res);
      if (!res) {
        ElMessage.error('下载文件失败')
        return false
      }

      const link = document.createElement('a')
      const blob = new Blob([res], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'
      })
      // console.log('blob', blob);
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', `${filename}.xlsx`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
    .catch((err) => {
      ElMessage.error('下载文件错误：' + err)
    })
}
