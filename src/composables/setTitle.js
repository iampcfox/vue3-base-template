import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
export const setMetaTitle = (options) => {
  const route = useRoute()
  const meta = options || route.meta
  return useHead({
    title: () => meta.title,
    titleTemplate: (title) => `H5低代码平台 ${title ? ` - ${title}` : ''}`,
    meta: [
      {
        name: 'description',
        content: () => meta.description
      },
      {
        name: 'keywords',
        content: () => meta.keywords
      }
    ]
  })
}
