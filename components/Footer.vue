<template>
  <footer class="relative bg-blue-nav text-blue-footertext py-8 md:py-12 pt-8 border-t border-blue-footerborder/30 mobile-footer">
    <div class="max-w-7xl mx-auto px-4 mobile-padding">
      
      <!-- 友情链接区域 -->
      <!-- <div class="mb-8" v-if="partnerSites && partnerSites.length > 0">
        <div class="text-blue-footer font-medium mb-4 text-left text-sm md:text-lg">Partner Sites</div>
        <div class="flex flex-wrap gap-x-6 gap-y-2">
          <a v-for="(item,index) in partnerSites" :key="index" 
             :href="item.url" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="text-blue-footertext hover:text-blue-footerhover transition-colors text-sm">
            {{ item.name }}
          </a>
        </div>
      </div> -->

      <!-- 分割线 -->
      <!-- <div class="w-full h-px bg-blue-footerborder/30 mb-8" v-if="partnerSites && partnerSites.length > 0"></div> -->

      <!-- 主要内容区域 -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mobile-footer-links">
        <!-- LOGO 和描述-->

        <div class="md:col-span-5 max-w-2xl">
          <div class="flex flex-col text-left">
            <p class="text-blue-logo text-2xl md:text-3xl font-bold mb-4">GPTOSS2</p>
            <p class="text-sm text-blue-footertext mb-4">
              Experience gpt-oss, OpenAI's powerful open-weight AI, through our intuitive web application. Get elite performance and chain-of-thought reasoning, with every request processed in a secure, private environment to guarantee your data's confidentiality.
            </p>
            <div class="flex flex-col gap-2 text-sm text-gray-500">
              <p>© 2025 gpt-oss All rights reserved.</p>
              <div>
                <p class="text-blue-footertext text-sm">
                  <a href="mailto:support@www.gptoss2.com" class="text-blue-h1 hover:text-blue-footerhover transition-colors">support@gptoss2.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 导航链接和法律条款 -->
        <div class="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-4">
          <div class="text-center sm:text-left">
            <div class="text-blue-logo font-medium mb-4 text-sm md:text-lg">Resources</div>
            <div class="flex flex-col gap-2 items-center sm:items-start">
              <template v-for="(section, index) in footerSections" :key="index">
                <div v-if="section.href && section.openInNewTab" 
                  @click="handleLinkClick(section.href, section.openInNewTab)"
                  class="text-blue-footertext hover:text-blue-logo transition-colors cursor-pointer flex items-center gap-2 justify-center sm:justify-start">
                  <span>{{ section.name }}</span>
                  <div class="flex items-center gap-1">
                    <span v-if="section.showBeta" class="bg-blue-logo/50 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                      Beta
                    </span>
                    <span v-if="section.badge" class="bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                      {{ section.badge }}
                    </span>
                  </div>
                </div>
                <NuxtLink v-else-if="section.href" :to="section.href" 
                  class="text-blue-footertext hover:text-blue-logo transition-colors flex items-center gap-2 justify-center sm:justify-start">
                  <span>{{ section.name }}</span>
                  <div class="flex items-center gap-1">
                    <span v-if="section.showBeta" class="bg-blue-logo/50 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                      Beta
                    </span>
                    <span v-if="section.badge" class="bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                      {{ section.badge }}
                    </span>
                  </div>
                </NuxtLink>
                <div v-else @click.prevent="handleNavClick(section.id)" 
                  class="text-blue-footertext hover:text-blue-logo transition-colors cursor-pointer flex items-center gap-2 justify-center sm:justify-start">
                  <span>{{ section.name }}</span>
                  <div class="flex items-center gap-1">
                    <span v-if="section.showBeta" class="bg-blue-logo/50 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                      Beta
                    </span>
                    <span v-if="section.badge" class="bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                      {{ section.badge }}
                    </span>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div v-if="productsSections && productsSections.length > 0" class="text-center sm:text-left">
            <div class="text-blue-logo font-medium mb-4 text-sm md:text-lg">Products</div>
            <div class="flex flex-col gap-2 items-center sm:items-start">
              <template v-for="(section, index) in productsSections" :key="index">
                <div v-if="section.href && section.openInNewTab" 
                  @click="handleLinkClick(section.href, section.openInNewTab)"
                  class="text-blue-footertext hover:text-blue-logo transition-colors cursor-pointer flex items-center gap-2 justify-center sm:justify-start">
                  <span>{{ section.name }}</span>
                  <div class="flex items-center gap-1">
                    <span v-if="section.showBeta" class="bg-blue-logo/50 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                      Beta
                    </span>
                    <span v-if="section.badge" class="bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                      {{ section.badge }}
                    </span>
                  </div>
                </div>
                <NuxtLink v-else-if="section.href" :to="section.href" 
                  class="text-blue-footertext hover:text-blue-logo transition-colors flex items-center gap-2 justify-center sm:justify-start">
                  <span>{{ section.name }}</span>
                  <div class="flex items-center gap-1">
                    <span v-if="section.showBeta" class="bg-blue-logo/50 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                      Beta
                    </span>
                    <span v-if="section.badge" class="bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                      {{ section.badge }}
                    </span>
                  </div>
                </NuxtLink>
                <div v-else @click.prevent="handleNavClick(section.id)" 
                  class="text-blue-footertext hover:text-blue-logo transition-colors cursor-pointer flex items-center gap-2 justify-center sm:justify-start">
                  <span>{{ section.name }}</span>
                  <div class="flex items-center gap-1">
                    <span v-if="section.showBeta" class="bg-blue-logo/50 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                      Beta
                    </span>
                    <span v-if="section.badge" class="bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                      {{ section.badge }}
                    </span>
                  </div>
                </div>
              </template>
            </div>
          </div>



          <div class="text-center sm:text-left">
            <div class="text-blue-logo font-medium mb-4 text-sm md:text-lg">Legal</div>
            <div class="flex flex-col gap-2 items-center sm:items-start">
              <NuxtLink to="/subsidiary/privacy-policy" class="text-blue-footertext hover:text-blue-logo transition-colors text-center sm:text-left">Privacy Policy</NuxtLink>
              <NuxtLink to="/subsidiary/terms-of-service" class="text-blue-footertext hover:text-blue-logo transition-colors text-center sm:text-left">Terms of Service</NuxtLink>
            </div>
          </div>

<div class="text-center sm:text-left">
            <div class="text-blue-logo font-medium mb-4 text-sm md:text-lg">Media</div>
            <div class="flex flex-col gap-2 items-center sm:items-start">
              <a href="https://github.com/openai/gpt-oss" target="_blank" rel="noopener noreferrer" class="text-blue-footertext hover:text-blue-logo transition-colors text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNavigation } from '~/utils/navigation'
import { getFriendLinkList } from '~/api'
import { useAsyncData } from 'nuxt/app'

interface PartnerSite {
  url: string
  name: string
}

const { activeSection, sections, handleNavClick, handleScroll, footerSections, productsSections } = useNavigation()

// 处理链接点击，支持新标签页打开
const handleLinkClick = (href: string, openInNewTab?: boolean) => {
  if (openInNewTab) {
    window.open(href, '_blank', 'noopener,noreferrer');
  }
};

// 服务端请求友情链接
const { data: partnerSites, error } = await useAsyncData('partnerSites', async () => {
  const res = await getFriendLinkList()
  if (res.code === 200) {
    return res.data as PartnerSite[]
  }
  return []
})
</script>

<style scoped>
/* 导航链接悬停效果 */
a {
  position: relative;
  transition: color 0.2s ease;
}

a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: currentColor;
  transition: width 0.2s ease;
}

a:hover::after {
  width: 100%;
}

/* 响应式优化 */
@media (max-width: 640px) {
  .mobile-footer-links {
    gap: 6rem !important;
  }
}

/* 媒体图标样式 */
svg {
  display: inline-block;
  vertical-align: middle;
}

footer a:focus {
  outline: none !important;
  box-shadow: none !important;
}

/* 确保标签在小屏幕上也能正确显示 */
@media (max-width: 640px) {
  .flex.items-center.justify-between {
    flex-wrap: wrap;
  }
  
  .flex.items-center.gap-2.ml-2 {
    margin-left: 0;
    margin-top: 0.25rem;
  }
}
</style>