export default (key = 'productId') => {
  const paramsStr = window.location.search
  const params = new URLSearchParams(paramsStr)
  let n = params.get(key)

  if (key === 'productId' && !n && n != 0) {
    n = 218 // 专用于模拟数据
    if (import.meta.env.VITE_NODE_ENV === 'development') {
      console.log('=== 当前是测试环境 ===')
    }
    console.log('=== 用于测试snmId ===', n)
  }

  return n
}
