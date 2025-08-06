<template>
  <section id="for-whom" class="bg-gradient-to-br from-blue-pale via-blue-light to-white py-28 relative overflow-hidden">
    <!-- 背景装饰元素 -->
    <div class="absolute inset-0 opacity-3">
      <div class="absolute top-20 left-10 w-40 h-40 bg-blue-dark rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-48 h-48 bg-blue-parameters rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-dark to-blue-parameters rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-7xl mx-auto px-8 relative z-10">
      <!-- 标题区域优化 -->
      <div class="text-center mb-20">
        <div class="inline-flex items-center gap-4 mb-8">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-dark to-blue-parameters rounded-3xl flex items-center justify-center shadow-xl">
            <span class="text-3xl">🎨</span>
          </div>
          <h2 class="text-4xl font-bold bg-gradient-to-r from-blue-dark via-blue-parameters to-blue-h1end bg-clip-text text-transparent leading-tight">
            Empowering Every Visual Creator
          </h2>
        </div>
        <p class="text-2xl md:text-3xl text-blue-h1p max-w-5xl mx-auto leading-relaxed font-light">
          Whether you're a solo artist or part of a global team, Wan 2.2 is designed to be your powerful creative partner.
        </p>
      </div>

      <div class="max-w-6xl mx-auto" id="for-whom-tabs">
        <!-- 标签页按钮优化 -->
        <div class="flex justify-center gap-4 mb-16 border-b border-blue-footerborder/40 flex-wrap">
          <button 
            v-for="(tab, index) in tabs" 
            :key="tab.id"
            :class="[
              'group px-8 py-5 cursor-pointer font-bold text-xl transition-all duration-300 border-b-2 flex items-center gap-4 rounded-2xl relative overflow-hidden',
              activeTab === tab.id 
                ? 'text-blue-dark border-blue-dark bg-blue-pale/60 shadow-xl' 
                : 'text-blue-secondarytext border-transparent hover:text-blue-dark hover:bg-blue-pale/40'
            ]"
            @click="setActiveTab(tab.id)"
          >
            <!-- 背景动画效果 -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-dark/10 to-blue-parameters/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span class="text-3xl relative z-10 group-hover:scale-110 transition-transform duration-300">{{ tab.emoji }}</span>
            <span class="relative z-10">{{ tab.title }}</span>
          </button>
        </div>

        <!-- 标签页内容面板优化 -->
        <div class="text-left">
          <div 
            v-for="(tab, index) in tabs" 
            :key="tab.id"
            :class="[
              'animate-fade-in bg-blue-nav/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-blue-footerborder/30 relative overflow-hidden',
              activeTab === tab.id ? 'block' : 'hidden'
            ]"
          >
            <!-- 卡片背景装饰 -->
            <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-dark/5 to-blue-parameters/5 rounded-full blur-2xl"></div>
            
            <div class="flex items-start gap-8 mb-10 relative z-10">
              <div class="text-5xl md:text-6xl p-6 bg-gradient-to-br from-blue-pale to-blue-light rounded-3xl shadow-xl border border-blue-footerborder/20">
                {{ tab.emoji }}
              </div>
              <div class="flex-1">
                <h3 class="text-4xl md:text-5xl font-bold text-blue-maintext mb-6 leading-tight">
                  {{ tab.heading }}
                </h3>
                <p class="text-blue-secondarytext text-2xl leading-relaxed font-light">
                  {{ tab.content }}
                </p>
              </div>
            </div>
            
            <!-- 特性亮点优化 -->
            <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div v-for="(feature, idx) in tab.features" :key="idx" 
                   class="group flex items-center gap-5 p-8 bg-gradient-to-r from-blue-pale/60 to-blue-light/60 rounded-3xl border border-blue-footerborder/30 hover:shadow-2xl transition-all duration-300 cursor-pointer">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-dark to-blue-parameters rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span class="text-2xl text-white">{{ feature.icon }}</span>
                </div>
                <span class="text-blue-maintext font-bold text-xl group-hover:text-blue-dark transition-colors duration-300">{{ feature.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('tab1')

const tabs = [
        {
          id: 'tab1',
          title: 'AI Creators',
          emoji: '🤖',
          heading: 'For the AI Creator & Enthusiast',
          content: 'With Wan 2.2, quickly test your most ambitious prompts, generate stunning visual works to share with the community, and push the boundaries of creative AI. Be a pioneer in the art of video generation.',
          features: [
            { icon: '⚡', text: 'Rapid prototyping' },
            { icon: '🎯', text: 'Advanced prompts' },
            { icon: '🚀', text: 'Community sharing' },
            { icon: '💡', text: 'Creative exploration' }
          ]
        },
        {
          id: 'tab2',
          title: 'Film & Ad Pros',
          emoji: '🎬',
          heading: 'For the Film & Ad Professional',
          content: 'Wan 2.2 helps drastically shorten pre-production cycles by generating dynamic storyboards, scene previs, and visual concepts in minutes, not days. Iterate on creative ideas instantly and bring your vision to life faster.',
          features: [
            { icon: '📋', text: 'Storyboard creation' },
            { icon: '🎭', text: 'Scene previsualization' },
            { icon: '⏱️', text: 'Time-saving workflow' },
            { icon: '🎨', text: 'Visual concepts' }
          ]
        },
        {
          id: 'tab3',
          title: 'Marketers',
          emoji: '📈',
          heading: 'For the Marketer & E-commerce Operator',
          content: 'Wan 2.2 empowers marketers to generate endless, eye-catching video assets for social media campaigns, product showcases, and digital ads. Boost engagement and click-through rates with visuals that stop the scroll.',
          features: [
            { icon: '📱', text: 'Social media ready' },
            { icon: '🛍️', text: 'Product showcases' },
            { icon: '📊', text: 'High engagement' },
            { icon: '🎯', text: 'Targeted campaigns' }
          ]
        },
        {
          id: 'tab4',
          title: 'Educators',
          emoji: '🎓',
          heading: 'For the Educator & Trainer',
          content: 'Use Wan 2.2 as a cutting-edge teaching tool to demonstrate the power of artificial intelligence. Visually explain complex concepts and inspire the next generation of creators and technologists.',
          features: [
            { icon: '📚', text: 'Educational content' },
            { icon: '🔬', text: 'AI demonstration' },
            { icon: '🌟', text: 'Inspire students' },
            { icon: '💻', text: 'Tech education' }
          ]
        }
]

const setActiveTab = (tabId: string) => {
  activeTab.value = tabId
}
</script>

<style scoped>
/* 增强的淡入动画 */
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(40px) scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

.animate-fade-in {
  animation: fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 标签页按钮悬停效果增强 */
button {
  position: relative;
  overflow: hidden;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s;
}

button:hover::before {
  left: 100%;
}

/* 卡片悬停效果增强 */
.animate-fade-in:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 30px 60px rgba(102, 95, 250, 0.15);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 特性卡片悬停效果增强 */
.bg-gradient-to-r:hover:not(h2) {
  background: linear-gradient(135deg, rgba(102, 95, 250, 0.1), rgba(64, 4, 186, 0.1));
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 15px 40px rgba(102, 95, 250, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 渐变文字效果增强 */
.bg-gradient-to-r {
  background-size: 300% 100%;
  animation: gradient-shift 5s ease-in-out infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* 响应式优化增强 */
@media (max-width: 1024px) {
  .text-6xl {
    font-size: 3.5rem;
  }
  
  .text-4xl {
    font-size: 2.5rem;
  }
  
  .p-12 {
    padding: 2rem;
  }
  
  .gap-8 {
    gap: 1.5rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .text-6xl {
    font-size: 3rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .p-12 {
    padding: 1.5rem;
  }
  
  .gap-8 {
    gap: 1rem;
  }
  
  .text-2xl {
    font-size: 1.25rem;
  }
  
  .px-8 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 640px) {
  .text-6xl {
    font-size: 2.5rem;
  }
  
  .text-4xl {
    font-size: 1.75rem;
  }
  
  .flex-wrap {
    flex-direction: column;
    align-items: center;
  }
  
  .gap-4 {
    gap: 0.75rem;
  }
  
  .px-8 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}

/* 滚动条样式优化 */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(102, 95, 250, 0.1);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #665ffa, #4004ba);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #7D72FF, #665ffa);
}

/* 选择文本样式 */
::selection {
  background: rgba(102, 95, 250, 0.2);
  color: #665ffa;
}

/* 焦点样式优化 */
button:focus {
  outline: 3px solid #665ffa;
  outline-offset: 3px;
}

/* 加载状态优化 */
.animate-fade-in {
  will-change: transform, opacity;
}

/* 背景装饰优化 */
.opacity-3 {
  opacity: 0.03;
}
</style> 