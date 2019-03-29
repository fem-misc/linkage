import '@/plugins/element.js'
import '@/plugins/el-form-renderer.js'

import { createApp } from './core'

const { app, router } = createApp()

router.onReady(() => app.$mount('#app'))
