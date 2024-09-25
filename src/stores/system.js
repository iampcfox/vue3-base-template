import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', {
  state: () => ({
    systemInfo: {
      title: 'H5低代码平台'
    }
  })
})
