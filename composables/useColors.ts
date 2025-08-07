import { ref, computed, readonly } from 'vue'
import { colors, type ColorScheme } from '~/utils/colors'

// 主题类型
export type Theme = 'light' | 'dark'

// 颜色管理组合式函数
export const useColors = () => {
  // 当前主题
  const currentTheme = ref<Theme>('light')
  
  // 切换主题
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
    // 更新文档属性
    document.documentElement.setAttribute('data-theme', currentTheme.value)
    // 保存到本地存储
    if (process.client) {
      localStorage.setItem('theme', currentTheme.value)
    }
  }
  
  // 设置主题
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    document.documentElement.setAttribute('data-theme', theme)
    if (process.client) {
      localStorage.setItem('theme', theme)
    }
  }
  
  // 初始化主题
  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme') as Theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      const theme = savedTheme || (prefersDark ? 'dark' : 'light')
      setTheme(theme)
    }
  }
  
  // 获取颜色值
  const getColor = (path: string): string => {
    const keys = path.split('.')
    let value: any = colors
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key]
      } else {
        console.warn(`Color path "${path}" not found`)
        return '#000000'
      }
    }
    
    return value
  }
  
  // 获取CSS变量值
  const getCSSVariable = (variable: string): string => {
    if (process.client) {
      return getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
    }
    return ''
  }
  
  // 设置CSS变量
  const setCSSVariable = (variable: string, value: string) => {
    if (process.client) {
      document.documentElement.style.setProperty(variable, value)
    }
  }
  
  // 颜色对象
  const colorScheme = computed<ColorScheme>(() => colors)
  
  return {
    // 状态
    currentTheme: readonly(currentTheme),
    colorScheme,
    
    // 方法
    toggleTheme,
    setTheme,
    initTheme,
    getColor,
    getCSSVariable,
    setCSSVariable,
  }
}

// 导出颜色常量
export { colors } 