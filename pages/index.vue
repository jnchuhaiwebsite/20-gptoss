<template>
  <div class="min-h-screen bg-gray-50">
    <main>
      <!-- 主功能区 -->
      <!-- <GptOssHero /> -->
      
      <!-- GPT-OSS 介绍 -->
      <GptOssIntro />
      
      <!-- 适用人群 -->
      <GptOssForWhom />
      
      <!-- 核心优势 -->
      <GptOssAdvantages />
      
      <!-- 模型对比 -->
      <ModelComparisonTable />
      
      <!-- 提示解决方案 -->
      <PromptSolutions />
      
      <!-- 套餐价格 -->
      <GptOssPricing />

      <!-- 常见问题 -->
      <GptOssFaq />
      
      <!-- 最终行动号召 -->
      <!-- <GptOssFinalCta /> -->

    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useSeo } from '~/composables/useSeo'
import { useNuxtApp } from 'nuxt/app'
import { useNavigation } from '~/utils/navigation'

// 导入组件
import Navbar from '~/components/Navbar.vue'
import GptOssHero from '~/components/GptOssHero.vue'
import GptOssIntro from '~/components/GptOssIntro.vue'
import GptOssForWhom from '~/components/GptOssForWhom.vue'
import GptOssAdvantages from '~/components/GptOssAdvantages.vue'
import ModelComparisonTable from '~/components/ModelComparisonTable.vue'
import PromptSolutions from '~/components/PromptSolutions.vue'
import GptOssPricing from '~/components/GptOssPricing.vue'
import GptOssFaq from '~/components/GptOssFaq.vue'
import GptOssFinalCta from '~/components/GptOssFinalCta.vue'

const { $toast } = useNuxtApp() as any
const { handleScroll } = useNavigation()

// 使用默认的 SEO 配置
useSeo({
  title: 'GPT-OSS: Private & Powerful Open-Weight AI by OpenAI',
  description: 'Experience GPT-OSS: OpenAI\'s first open-weight model since GPT-2. Get superior performance with full data privacy on your own system. Start for free today!'
})

// 处理支付回调
onMounted(() => {
  if (typeof window === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  const paySuccess = urlParams.get("paysuccess");

  if (paySuccess == "1") {
    window.history.replaceState({}, "", window.location.pathname);
    setTimeout(() => {
      $toast.success("Thank you for your support! Your membership benefits are now activated.", 3000);
    }, 500);
  } else if (urlParams.get("payfail") == "1") {
    window.history.replaceState({}, "", window.location.pathname);
  }

  // 添加滚动监听
  window.addEventListener('scroll', handleScroll)
})

// 清理滚动监听
onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>