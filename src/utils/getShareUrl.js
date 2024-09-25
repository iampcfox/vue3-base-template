export const getSharePageUrl = (pageId) => {
  return `${import.meta.env.VITE_BASE}/sharePage/${pageId}`
}

const currentHostname = window.location.hostname // 域名或ip
const port = window.location.port // 端口
const protocol = window.location.protocol // 协议
export const getBaseShareUrl = () => {
  let effectivePort = null
  if (port) {
    effectivePort = port
  } else {
    if (protocol === 'http:') {
      effectivePort = 80
    } else {
      effectivePort = 443
    }
  }
  return `${protocol}//${currentHostname}:${effectivePort}`
}

export const getFullUrl = (pageId) => {
  return getBaseShareUrl() + getSharePageUrl(pageId)
}
