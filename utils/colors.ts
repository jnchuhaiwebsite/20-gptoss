// 颜色配置文件
export const colors = {
  // 主色调
  primary: {
    main: '#284bfb',
    hover: '#4a47a3',
    light: '#615eff',
  },
  
  // 背景色
  background: {
    primary: '#ffffff',
    secondary: '#f9f9f9',
    dark: '#1a1a2e',
    gray: '#f5f5f5',
    gray50: '#f9fafb',
  },
  
  // 文字颜色
  text: {
    primary: '#1a1a2e',
    secondary: '#555555',
    tertiary: '#333333',
    light: '#ffffff',
    muted: '#6b7280',
  },
  
  // 边框颜色
  border: {
    light: '#e0e0e0',
    medium: '#d1d5db',
    dark: '#9ca3af',
  },
  
  // 阴影颜色
  shadow: {
    light: 'rgba(0,0,0,0.07)',
    medium: 'rgba(0,0,0,0.1)',
    dark: 'rgba(0,0,0,0.15)',
    primary: 'rgba(97, 94, 255, 0.4)',
  },
  
  // 状态颜色
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  // 表格颜色
  table: {
    header: '#000000',
    headerText: '#ffffff',
    rowHover: '#f8f9fa',
    border: '#e0e0e0',
  },
  
  // 卡片颜色
  card: {
    background: '#ffffff',
    border: '#e5e7eb',
    shadow: 'rgba(0,0,0,0.07)',
    shadowHover: 'rgba(0,0,0,0.1)',
  },
  
  // 按钮颜色
  button: {
    primary: '#284bfb',
    primaryHover: '#4a47a3',
    secondary: '#6b7280',
    secondaryHover: '#4b5563',
  },
  
  // FAQ 组件颜色
  faq: {
    borderLeft: '#284bfb',
    background: '#ffffff',
  },
  
  // 渐变颜色
  gradient: {
    primary: 'linear-gradient(135deg, #284bfb 0%, #4a47a3 100%)',
    secondary: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  },
} as const

// 导出颜色类型
export type ColorScheme = typeof colors

// 获取颜色的辅助函数
export const getColor = (path: string): string => {
  const keys = path.split('.')
  let value: any = colors
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      console.warn(`Color path "${path}" not found`)
      return '#000000' // 默认黑色
    }
  }
  
  return value
}

// 导出默认颜色配置
export default colors 