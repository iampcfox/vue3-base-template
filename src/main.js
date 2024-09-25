import './assets/css/tailwind.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueHeadMixin, createHead } from '@unhead/vue'

import App from './App.vue'
import router from './router'
import 'dayjs/locale/zh-cn'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import VueQrcode from 'vue-qrcode'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import 'animate.css/animate.min.css'
//引入element-plus中文包
const head = createHead()

import 'vant/lib/index.css'
// import 'viewerjs/dist/viewer.css'
// import VueViewer from 'v-viewer'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  // console.log(key, component)
  app.component(key, component)
}
// app.component('vue-qrcode', VueQrcode)
app.use(head)
app.use(router)
app.use(ElementPlus)
app.use(createPinia())
app.mixin(VueHeadMixin)
// app.use(VueViewer)
app.mount('#app')
