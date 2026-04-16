import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// @ts-ignore
import { YikeResolver } from '@yike-design/resolver'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ resolvers: [YikeResolver] }),
    Components({ resolvers: [YikeResolver] }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // css预处理器配置
  css:{
    preprocessorOptions:{
      less:{
        charset: false,
        // 添加 yike-design 的基础变量
        additionalData: `@import "@yike-design/ui/es/components/styles/basis.less";`,
      },
    },
  },
})