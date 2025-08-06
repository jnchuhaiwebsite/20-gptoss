// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  ssr: true, // 启用服务端渲染
  compatibilityDate: '2025-05-28', // 兼容性日期
  devtools: { enabled: true }, // 启用 Nuxt DevTools
  css: [
    '~/assets/css/tailwind.css', // Tailwind CSS 样式
    '@/assets/css/main.css', // 主样式文件
  ],
  plugins: [
    // '~/plugins/google-analytics.client.ts', // Google Analytics 插件（仅客户端）
  ],
  runtimeConfig: {
    public: {
      appid: process.env.APPID, // 应用 ID
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL, // 基础URL
    },
  },
  modules: [
    '@clerk/nuxt', // Clerk 集成
    '@pinia/nuxt', // Pinia 状态管理
    '@nuxtjs/tailwindcss', // Tailwind CSS 集成
    '@nuxt/image', // Nuxt Image 模块
  ],
  app: {
    head: {
      title: 'GPT-OSS: Private & Powerful Open-Weight AI by OpenAI',
      htmlAttrs: {
        lang: 'en' // 设置 HTML 语言
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Experience GPT-OSS: OpenAI\'s first open-weight model since GPT-2. Get superior performance with full data privacy on your own system. Start for free today!'
        },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'GPT-OSS: Private & Powerful Open-Weight AI by OpenAI' },
        { property: 'og:description', content: 'Experience GPT-OSS: OpenAI\'s first open-weight model since GPT-2. Get superior performance with full data privacy on your own system.' },
        { property: 'og:image', content: '/favicon.ico' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'GPT-OSS: Private & Powerful Open-Weight AI by OpenAI' },
        { name: 'twitter:description', content: 'Experience GPT-OSS: OpenAI\'s first open-weight model since GPT-2. Get superior performance with full data privacy on your own system.' },
        { name: 'twitter:image', content: '/favicon.ico' },
        // Keywords
        { name: 'keywords', content: 'GPT-OSS, OpenAI, open-weight AI, private AI, on-premise AI, chain-of-thought, AI reasoning' },
        { name: 'author', content: 'GPT-OSS Team' },
        { name: 'application-name', content: 'GPT-OSS' },
      ],
      script: [
        { src: '/js/c6h.js', async: true } 
      ], // 外部脚本
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://gptoss.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap' }
      ]
    }
  },
  routeRules: {
    '/blog': { isr: true, prerender: true },
    '/blog/**': { isr: 60 },
  },
  nitro: {
    preset: 'cloudflare_pages',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    },
    devProxy: {
      '/nuxtRequest': {
        target: process.env.NUXT_PUBLIC_API_BASE, // 从环境变量获取代理目标
        changeOrigin: true, // 允许跨域
        prependPath: false // 不添加代理路径前缀
      }
    },
    // 预渲染
    prerender: {
      // 预渲染路由
      routes: [
        // '/blog',
        '/subsidiary/privacy-policy',
        '/subsidiary/terms-of-service'
      ],
      crawlLinks: false,
      autoSubfolderIndex: false,
      failOnError: false,
      ignore: [
        '/api/**', // 忽略 API 路由
        '/admin/**' // 忽略管理后台路由
      ]
    },
  },
  // Nuxt3正确的Tailwind配置
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: false,
  },
  // 使用vite的正确配置方式
  vite: {
    build: {
      cssCodeSplit: false,
      // 强制提取CSS到单独文件
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return '_nuxt/css/[hash][extname]';
            }
            return '_nuxt/assets/[hash][extname]';
          },
          // 优化代码分割
          manualChunks: {
            // 将 Vue 相关代码分离
            'vue-vendor': ['vue', 'vue-router'],
            // 将 UI 组件分离
            'ui-components': ['@heroicons/vue'],
            // 将工具库分离
            'utils': ['pinia', 'exifr']
          }
        }
      },
      // 代码压缩配置 - 正确的位置
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // 移除 console 语句
          drop_debugger: true, // 移除 debugger 语句
          pure_funcs: ['console.log', 'console.info', 'console.warn', 'console.error'], // 移除特定的函数调用
          passes: 3, // 增加压缩次数
          dead_code: true, // 移除未使用的代码
          global_defs: {
            'process.env.NODE_ENV': '"production"' // 定义全局变量
          }
        },
        mangle: true, // 混淆变量名
        format: {
          comments: false // 移除注释
        }
      },
      // 优化资源大小
      chunkSizeWarningLimit: 1000,
      // 启用 gzip 压缩
      reportCompressedSize: true
    },
    // 确保CSS的sourcemap
    css: {
      devSourcemap: true
    }
  },
  // 强制CSS提取的配置
  experimental: {
    // 强制禁用内联样式，将样式提取到外部文件
    inlineSSRStyles: false,
    // 启用vite特性兼容
    viteNode: true
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },
})