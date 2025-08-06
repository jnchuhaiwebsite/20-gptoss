<template>
  <section id="pricing" class="py-20  bg-blue-light">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-blue-dark mb-6">Simple Plans for Every Creator</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Start for free and scale as you grow. Find the perfect plan to unlock the full potential of Wan 2.2 Plus for your needs.
        </p>
      </div>
      
      <!-- 加载状态 -->
      <div v-if="pending" class="flex justify-center items-center py-20 w-full" aria-live="polite">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
          aria-label="Loading pricing plans"
        ></div>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="text-center py-20">
        <div class="text-red-500 text-xl mb-4">Failed to load pricing plans</div>
        <button @click="refreshData" class="px-6 py-3 bg-blue-dark text-white rounded-lg hover:bg-blue-medium transition-colors">
          Try Again
        </button>
      </div>
      
      <!-- 定价方案网格 -->
      <div v-else class="grid md:grid-cols-3 gap-8">
        <!-- 动态渲染套餐卡片 -->
        <article
          v-for="(plan, index) in planData"
          :key="index"
          :class="[
            'relative bg-white p-8 rounded-xl flex flex-col h-full transition-all duration-300',
            plan.is_popular
              ? 'border-2 border-blue-dark transform scale-105 shadow-xl z-10'
              : 'border border-gray-200 hover:shadow-lg hover:-translate-y-1'
          ]"
          :aria-labelledby="`plan-${index}-title`"
        >
          <!-- 热门标签 -->
          <div
            v-if="plan.is_popular"
            class="absolute -top-3 left-1/2 transform -translate-x-1/2"
          >
            <span class="bg-blue-dark text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
          </div>
          
          <!-- 套餐标题 -->
          <div class="text-center">
            <h3 
              :id="`plan-${index}-title`"
              class="text-xl font-semibold text-blue-dark mb-4"
            >
              {{ plan.name }}
            </h3>
            <div class="text-4xl font-bold text-blue-dark mb-4">
              ${{ plan.price }}
              <span v-if="plan.price > 0" class="text-lg text-gray-500 font-normal">one-time</span>
            </div>
            <!-- <p class="text-gray-600 mb-8" v-html="plan.description"></p> -->
          </div>
          
          <!-- 操作按钮 -->
          <div class="mb-8">
            <button
              @click="plan.code ? handleUpgradePlan(plan) : null"
              :disabled="upgradingPlanId === plan.code"
              :class="[
                'w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-h-[44px]',
                getButtonClass(plan)
              ]"
              :aria-describedby="`plan-${index}-title`"
            >
              <div v-if="upgradingPlanId === plan.code" class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2" aria-hidden="true"></div>
              <span>{{ plan.button_text }}</span>
            </button>
          </div>
          
          <!-- 功能特性列表 -->
          <section class="flex-grow" :aria-label="`${plan.name} plan features`">
            <ul class="space-y-3">
              <li
                v-for="(feature, fIndex) in getPlanFeatures(plan)"
                :key="fIndex"
                class="flex items-center text-gray-600"
              >
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-sm leading-relaxed" v-html="feature"></span>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { getSubPlans, payOrder } from "~/api/index";
import { useClerkAuth } from '~/utils/authHelper';
import { useAsyncData } from 'nuxt/app';

// 定义套餐数据类型
interface PricingPlan {
  name: string;
  description: string;
  price: number;
  code: string;
  button_text: string;
  is_popular: boolean;
  features: string | string[];
}

// 引入auth认证
const {
  isSignedIn
} = useClerkAuth();

// 用户状态
const upgradingPlanId = ref<string | null>(null);

// 使用useAsyncData获取套餐数据
const { data, pending, error, refresh } = await useAsyncData('pricingPlans', async () => {
  try {
    const response = await getSubPlans();
    return response.data as PricingPlan[];
  } catch (err) {
    console.error('Error fetching pricing plans:', err);
    throw err;
  }
});

// 监听数据变化
watch(data, (newData) => {
  console.log('Pricing data updated:', newData);
});

// 计算属性：确保data有值时才返回
const planData = computed(() => {
  return data.value || [];
});

// 刷新数据
const refreshData = () => {
  refresh();
};

// 获取套餐特性列表
const getPlanFeatures = (plan: PricingPlan): string[] => {
  if (!plan.features) return [];
  // 如果特性是字符串，按逗号分割
  if (typeof plan.features === 'string') {
    return plan.features.split(',').map((feature: string) => feature.trim());
  }
  // 如果已经是数组，直接返回
  return Array.isArray(plan.features) ? plan.features : [];
};

// 获取按钮样式
const getButtonClass = (plan: PricingPlan): string => {
  if (plan.price === 0) {
    return "border border-blue-dark text-blue-dark hover:bg-blue-dark hover:text-white";
  } else if (plan.is_popular) {
    return "bg-blue-dark text-white hover:bg-blue-medium";
  } else {
    return "border bg-blue-button text-white border-blue-dark text-blue-dark hover:bg-blue-dark hover:text-white";
  }
};

// 处理升级计划
const handleUpgradePlan = async (plan: PricingPlan) => {
  // 如果没有登录，则提示登录并触发登录
  if (!isSignedIn.value) {
    try {
      const loginBtn = document.querySelector('#bindLogin') as HTMLElement;
      if (loginBtn) {
        loginBtn.click();
      }
    } catch (error) {
      console.error("Failed to find login:", error);
    }
    return;
  }

  upgradingPlanId.value = plan.code;
  try {
    const response = (await payOrder({ price_id: plan.code })) as any;
    if (response.code === 200 && response.data?.url) {
      window.location.href = response.data.url;
    } else {
      throw new Error(response.msg || "Failed to create payment order");
    }
  } catch (error) {
    console.error("Payment failed:", error);
  } finally {
    upgradingPlanId.value = null;
  }
};
</script>

<style scoped>
.hover-theme:hover {
  background-color: var(--theme-primary-hover) !important;
  color: #fff !important;
}
</style> 