import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
        fontSize: {
            // 定义2.8rem的自定义文本大小
            '28rem': '2.8rem',
        },
      colors: {
        theme: '#ffffff',
        // 主色调
        primary: '#284bfb',
        'primary-hover': '#4a47a3',
        'primary-light': '#615eff',
        
        // 背景色
        'bg-primary': '#ffffff',
        'bg-secondary': '#f9f9f9',
        'bg-dark': '#1a1a2e',
        'bg-gray': '#f5f5f5',
        'bg-gray50': '#f9fafb',
        
        // 文字颜色
        'text-primary': '#1a1a2e',
        'text-secondary': '#555555',
        'text-tertiary': '#333333',
        'text-light': '#ffffff',
        'text-muted': '#6b7280',
        
        // 边框颜色
        'border-light': '#e0e0e0',
        'border-medium': '#d1d5db',
        'border-dark': '#9ca3af',
        
        // 阴影颜色
        'shadow-light': 'rgba(0,0,0,0.07)',
        'shadow-medium': 'rgba(0,0,0,0.1)',
        'shadow-dark': 'rgba(0,0,0,0.15)',
        'shadow-primary': 'rgba(97, 94, 255, 0.4)',
        
        // 状态颜色
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
        
        // 表格颜色
        'table-header': '#000000',
        'table-header-text': '#ffffff',
        'table-row-hover': '#f8f9fa',
        'table-border': '#e0e0e0',
        
        // 卡片颜色
        'card-bg': '#ffffff',
        'card-border': '#e5e7eb',
        'card-shadow': 'rgba(0,0,0,0.07)',
        'card-shadow-hover': 'rgba(0,0,0,0.1)',
        
        // 按钮颜色
        'button-primary': '#284bfb',
        'button-primary-hover': '#4a47a3',
        'button-secondary': '#6b7280',
        'button-secondary-hover': '#4b5563',
        
        // FAQ 组件颜色
        'faq-border-left': '#284bfb',
        'faq-bg': '#ffffff',
        
        // 扩展颜色 - 导航和文本
        'blue-medium': '#615eff',
        'blue-light': '#e6e8ff',
        'blue-navtext': '#1a1a2e',
        'blue-footertext': '#6b7280',
        'baby-pink': '#ffccd5',
        
        // 扩展颜色 - 红色系列
        'red-50': '#fef2f2',
        'red-100': '#fee2e2',
        'red-600': '#dc2626',
        'red-700': '#b91c1c',
        
        // 扩展颜色 - 粉色系列
        'pink-50': '#fdf2f8',
        'pink-100': '#fce7f3',
        
        blue: {
			dark: '#665ffa',          // [主品牌色] 用于所有关键交互元素，形成强烈的视觉焦点。
			medium: '#7D72FF',         // [悬停亮紫色] 提供明亮、清晰的悬停反馈。
			primary: '#284bfb',        // [主色调] 品牌核心蓝色
			'primary-hover': '#4a47a3', // [主色调悬停] 按钮等元素悬停状态
			navtext: '#165DFF',        // [导航文本] 导航栏链接文本
			footertext: '#6B7280',     // [页脚文本] 页脚区域文本
			light: '#E5E5E5',          // [高亮背景-浅灰] 用于热门套餐等区域的背景，比卡片背景稍亮，以示区别。
			pale: '#F7F7F7',          // [浅色主背景] 使用浅灰色背景，减轻眼睛疲劳，同时保持清新、现代感。
  
			// --- 标题与渐变 (浅色背景下的优化效果) ---
			h1: '#284bfb',              // [H1备用色] 渐变降级方案。
			h1p: '#333333',             // [H2/副标题] 深色灰色，确保在浅色背景下的清晰可读性。
			h1start: '#284bfb',        // [H1渐变起始] 保持不变。
			h1end: '#284bfb',          // [H1渐变结束] 保持不变。
			// CSS实现建议: h1 { background: linear-gradient(to right, #665ffa, #4004ba); -webkit-background-clip: text; background-clip: text; color: transparent; }
  
			// --- 文本颜色 ---
			maintext: '#333333',        // [主文本-深灰] 在浅色背景上，使用深灰色而非纯黑色，提供更柔和的阅读体验。
			secondarytext: '#777777',   // [次要文本-中灰] 用于描述、辅助信息，与主文本形成清晰的视觉层级。
  
			// --- 导航栏与表面元素 ---
			nav: '#FFFFFF',             // [表面-白色] 用于导航栏、卡片等“浮动”元素的背景，与浅色背景形成鲜明对比。
  
			// --- 组件 ---
			badge: '#284bfb',            // [徽章] 品牌紫。
			button: '#284bfb',          // [按钮] 主按钮。
			buttontext: '#FFFFFF',      // [按钮文字] 纯白。
			buttonhover: '#284bfb',      // [按钮悬停] 更亮的紫色。
  
			// --- 页脚 ---
			footer: '#665ffa',          // [页脚链接] 页脚中的重要链接。
			footerhover: '#284bfb',      // 页脚链接悬停时变为更亮的紫色。
			footerbg: '#FFFFFF',        // 与页面主背景色统一，保持整体性。
			footerborder: '#DDDDDD',     // [分割线-浅灰] 一条清晰但不突兀的灰色分割线。
  
			// --- 其他元素 ---
			logo: '#284bfb',            // [Logo] 品牌色。
			parameters: '#4004ba',      // [次要交互点] 使用深紫色。
			backtotop: '#284bfb',       // [返回顶部] 使用主品牌色。
  
			// --- 定价卡片 (采用浅色背景层次) ---
			pricing: '#FFFFFF',         // [卡片背景] 使用白色背景，保持简洁和明亮。
			pricingtext: '#333333',    // [卡片描述文字] 使用深灰色文字。
			pricinghover: '#665ffa',    // 悬停时边框或标题变为品牌色。
			pricingborder: '#DDDDDD',    // [卡片边框] 默认使用一个温和的浅灰色边框来定义卡片轮廓。
			pricingPopular: '#E5E5E5',  // [热门套餐背景] 使用“高亮背景浅灰色”，使其在视觉上更突出。
  
			// --- 定价卡片交互 ---
			pricingborderhover: '#665ffa',// 悬停时边框颜色变为品牌紫。
			pricingbordertext: '#333333',// 卡片内主要文字。
			pricingborderhovertext: '#665ffa',// 悬停时文字变为品牌紫。
  
			// --- 输入框 ---
			inputtext: '#777777',       // [输入框提示词] 使用浅灰色，避免强烈的对比。
			inputtextfilled: '#333333', // [输入框已填写文字] 使用深灰色文字。
  
			// --- 分辨率选择 ---
			resolutionlabel: '#665ffa', // [分辨率选择标签] 使用主文本颜色作为标签文字。
			resolutionoption: '#665ffa', // [分辨率选择选项] 使用次要文本颜色作为选项文字。
			resolutionoptionselected: '#665ffa', // [分辨率选择已选选项] 使用主文本颜色作为已选中的选项文字。
  
			// --- 比例选择 ---
			aspectlabel: '#665ffa', // [比例选择标签] 使用主文本颜色作为标签文字。
			aspectoption: '#665ffa', // [比例选择选项] 使用次要文本颜色作为选项文字。
			aspectoptionselected: '#665ffa' // [比例选择已选选项] 使用主文本颜色作为已选中的选项文字。
        },
        // 原有配置中的背景和前景色
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },

        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          hover: 'hsl(var(--secondary-hover))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
          hover: 'hsl(var(--muted-hover))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          hover: 'hsl(var(--accent-hover))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          hover: 'hsl(var(--destructive-hover))'
        },
    
        border: 'hsl(var(--border))',
        input: {
          DEFAULT: 'hsl(var(--input))',
          hover: 'hsl(var(--input-hover))',
          focus: 'hsl(var(--input-focus))'
        },
        ring: {
          DEFAULT: 'hsl(var(--ring))',
          offset: 'hsl(var(--ring-offset))'
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
          '6': 'hsl(var(--chart-6))',
          '7': 'hsl(var(--chart-7))',
          '8': 'hsl(var(--chart-8))'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'zoom-in': 'zoomIn 0.5s ease-out forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translate3d(0, 30px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translate3d(30px, 0, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translate3d(-30px, 0, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' }
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale3d(0.95, 0.95, 1)' },
          '100%': { opacity: '1', transform: 'scale3d(1, 1, 1)' }
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'var(--radius-lg)',
        '2xl': 'var(--radius-xl)',
        full: 'var(--radius-full)'
      },
      boxShadow: {
        sm: 'var(--shadow)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)'
      }
    }
  }
} satisfies Config
