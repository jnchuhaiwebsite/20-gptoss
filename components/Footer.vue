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
      <div class="flex flex-col items-center justify-center text-center mobile-footer-links">
        <!-- Logo 和描述 -->
        <div class="max-w-2xl">
          <div class="flex flex-col items-center text-center">
            <p class="text-blue-logo text-2xl md:text-3xl font-bold mb-4">GPTOSS2</p>
            <p class="text-sm text-blue-footertext mb-4">
              Experience gpt-oss, OpenAI's powerful open-weight AI, through our intuitive web application. Get elite performance and chain-of-thought reasoning, with every request processed in a secure, private environment to guarantee your data's confidentiality.
            </p>
            <div class="flex flex-col items-center gap-2 text-sm text-gray-500">
              <p>© 2025 gpt-oss All rights reserved.</p>
              <div class="text-center">
                <p class="text-blue-footertext text-sm">
                  <a href="mailto:support@www.gptoss2.com" class="text-blue-h1 hover:text-blue-footerhover transition-colors">support@www.gptoss2.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// import { useNavigation } from '~/utils/navigation'
// import { getFriendLinkList } from '~/api'
// import { useAsyncData } from 'nuxt/app'

// interface PartnerSite {
//   url: string
//   name: string
// }

// const { activeSection, sections, handleNavClick, handleScroll, footerSections, productsSections } = useNavigation()

// // 处理链接点击，支持新标签页打开
// const handleLinkClick = (href: string, openInNewTab?: boolean) => {
//   if (openInNewTab) {
//     window.open(href, '_blank', 'noopener,noreferrer');
//   }
// };

// 服务端请求友情链接
// const { data: partnerSites, error } = await useAsyncData('partnerSites', async () => {
//   const res = await getFriendLinkList()
//   if (res.code === 200) {
//     return res.data as PartnerSite[]
//   }
//   return []
// })
</script>

<style scoped>
/* 导航链接悬停效果 */
a {
  position: relative;
}

a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: theme('colors.blue.medium');  /* 使用Tailwind配置的颜色 */
  transition: width 0.3s ease;
}

a:hover::after {
  width: 100%;
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