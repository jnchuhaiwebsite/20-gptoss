<template>
  <div class="min-h-screen bg-blue-pale">
    <main>
      <!-- 主功能区 -->
      <HeroSection />
      
      <!-- 操作步骤 -->
      <ProcessSteps />
      
      <!-- 核心优势 -->
      <CoreFeatures />

            
      <!-- 适用人群 -->
      <ForWhomSection />
      
      <!-- 模型案例展示 -->
      <ModelShowcase />
      
      <!-- 套餐价格 -->
      <PricingPlans />

      <!-- 常见问题 -->
      <FaqPreview />

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
import HeroSection from '~/components/HeroSection.vue'
import ProcessSteps from '~/components/ProcessSteps.vue'
import CoreFeatures from '~/components/CoreFeatures.vue'
import ModelShowcase from '~/components/ModelShowcase.vue'
import PricingPlans from '~/components/PricingPlans.vue'
import ForWhomSection from '~/components/ForWhomSection.vue'

const { $toast } = useNuxtApp() as any
const { handleScroll } = useNavigation()

// 使用默认的 SEO 配置
useSeo({
  title: 'Wan 2.2 Plus - Cinematic AI Video Generator',
  description: 'Generate AI videos with Wan 2.2 Plus. Cinematic visuals, realistic motion, prompt control—ideal for creators and marketers.'
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