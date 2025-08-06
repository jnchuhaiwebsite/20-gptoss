<template>
  <section class="py-16  bg-blue-light">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 标题 -->
      <div class="text-center">
        <h2 class="text-4xl lg:text-5xl font-extrabold leading-tight mb-6 text-blue-h1">
          FAQ - Wan 2.2 Plus 
        </h2>
        <p class="text-xl leading-relaxed max-w-3xl mx-auto mb-16 text-blue-footertext">
          Find answers to frequently asked questions about Wan2.2 Plus, including pricing, credits, payments, and usage.
        </p>
      </div>

      <!-- FAQ列表 -->
      <div class="space-y-6">
        <div 
          v-for="(faq, index) in faqPreviewData" 
          :key="index"
          class="border border-blue-pricingborder rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-pricinghover group"
        >
          <button
            @click="toggleFaq(index)"
            class="flex justify-between items-start w-full text-left p-6 focus:outline-none bg-white hover:bg-blue-pale transition-colors duration-300"
          >
            <div class="flex items-start">
              <svg class="w-5 h-5 mr-3 text-blue-600 mt-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
              </svg>
              <h3 class="text-xl font-bold text-blue-h1 group-hover:text-blue-pricinghover transition-colors duration-300">
                {{ faq.question }}
              </h3>
            </div>
            <svg 
              :class="[
                'w-5 h-5 text-gray-400 transform transition-transform duration-200 mt-1 flex-shrink-0',
                openFaqs[index] ? 'rotate-180' : ''
              ]"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
            >
              <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <div 
            v-show="openFaqs[index]"
            class="px-6 pb-6 bg-blue-pale border-t border-blue-pricingborder"
          >
            <div class="pt-4 text-blue-footertext leading-relaxed prose prose-gray max-w-none">
              <div v-html="formatAnswer(faq.answer)"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 查看更多FAQ -->
      <div class="mt-16 text-center">
      <div class="text-2xl text-blue-secondarytext mb-6">
        Ready to create your own stunning videos?
      </div>
      <button
        @click="scrollToTop"
        class="bg-blue-dark text-blue-buttontext hover:bg-blue-buttonhover font-semibold px-8 py-4 rounded-lg transition-colors focus:outline-none text-xl"
      >
        Start Creating Your Video
      </button>
    </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'FaqPreview'
})

// FAQ数据 - 来自FAQ页面的前四个问题
const faqPreviewData = [
{
    "question": "What is Wan 2.2 Plus?",
    "answer": "Wan 2.2 Plus is a state-of-the-art AI video generation platform designed for creators who demand high quality and precision. It excels at transforming simple text prompts into stunning, cinematic videos with three key advantages:\n\n- **Cinematic Visuals:** It understands filmmaking language, allowing you to control camera angles, lighting, and shots for a professional look.\n- **Fluid Motion:** Our model produces incredibly smooth and realistic character and object movements, free from the jitter seen in other tools.\n- **Semantic Accuracy:** It precisely interprets complex prompts, ensuring the final video faithfully represents your creative vision."
  },
  {
    "question": "How long does it take to generate a video?",
    "answer": "Our platform is optimized for speed, but generation time depends on the selected quality. Here are our typical estimates:\n\n- **Standard Quality (480p):** Typically takes about **1 minute** to generate.\n- **High Quality (1080p):** Typically takes about **2 minutes** to generate.\n\nPlease note that these times can vary slightly depending on server traffic and the complexity of your prompt."
  },
  {
    "question": "Can I try the Wan 2.2 Plus AI Video Generator for free?",
    "answer": "Absolutely! We believe in letting you experience the power of Wan 2.2 Plus firsthand. Every new user who signs up receives **20 free credits**.\n\nThis is typically enough to generate one 480p video, allowing you to test the platform and see the quality of the results for yourself. No credit card is required to get started."
  },
  {
    "question": "Do the credits I receive or purchase have an expiration date?",
    "answer": "No, your credits are yours to keep. Any credits you receive upon signing up or purchase from a credit pack are **permanently valid** and will never expire. You can use them whenever your creativity strikes, whether it's today or a year from now."
  },
  {
    "question": "Can I use videos made with Wan 2.2 Plus AI Video Generator for commercial projects?",
    "answer": "Absolutely. We believe in empowering every creator. All videos you generate on the Wan 2.2 Plus platform, including those made with free trial credits, come with a full commercial license.\n\nThis means you are free to use your creations for any purpose, such as:\n\n- Marketing campaigns and online advertisements\n- Social media content for business accounts\n- Client projects and presentations\n- Monetized content on platforms like YouTube or TikTok\n\nOur goal is to provide you with complete creative and commercial freedom. For the full legal details, we always recommend reviewing our Terms of Service."
  }
]

// 跟踪每个FAQ项目的展开状态 - 默认全部折叠
const openFaqs = ref(Array(faqPreviewData.length).fill(false))

// 切换FAQ项目的展开/折叠状态
const toggleFaq = (index: number) => {
  openFaqs.value[index] = !openFaqs.value[index]
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
// 格式化回答文本
const formatAnswer = (answer: string) => {
  return answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}
</script>

<style scoped>
.prose {
  color: #374151;
  line-height: 1.7;
}

.prose strong {
  color: #111827;
  font-weight: 600;
}

.prose em {
  color: #6b7280;
  font-style: italic;
}

.prose br {
  margin-bottom: 0.5em;
}

.transition-all {
  transition-property: all;
}

.duration-200 {
  transition-duration: 200ms;
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 确保链接在prose中的样式 */
.prose a {
  color: #2563eb;
  text-decoration: underline;
}

.prose a:hover {
  color: #1d4ed8;
}

/* 强调文字样式 - 参考FeatureShowcase */
.prose strong {
  color: var(--blue-button);
  font-weight: 600;
}
</style>