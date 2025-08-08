<template>
  <div class="min-h-screen bg-gray-50">
    <main class="w-full mx-auto p-6 bg-white rounded-lg shadow-sm max-w-7xl min-h-screen mt-8 mb-8">
      <!-- 页面标题区域 -->
      <header class="mb-12">
        <PageHero 
          title="GPTOSS2 FAQ - Help Center"
          subtitle="Get answers to common questions about our AI-powered platform and features."
        />
      </header>

      <!-- FAQ Section with Sidebar Navigation -->
      <section class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-12 gap-8">
            <!-- Sidebar Navigation -->
            <aside class="hidden md:block md:col-span-3 lg:col-span-3 xl:col-span-3 h-fit sticky top-8">
              <nav class="space-y-1 bg-white rounded-lg shadow-md p-5 border border-gray-100">
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Categories</p>
                <ul class="space-y-1">
                  <li v-for="category in categories" :key="category.id">
                    <a
                      href="#"
                      @click.prevent="setActiveCategory(category.id)"
                      :class="['category-link whitespace-nowrap', activeCategory === category.id ? 'active-section' : 'text-gray-700']"
                    >
                      {{ category.name }}
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>

            <!-- Mobile Navigation Toggle (Hidden on desktop) -->
            <div class="md:hidden mb-6 col-span-12">
              <button
                @click="toggleMobileNav"
                class="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg shadow-sm"
              >
                <span class="font-medium text-gray-900">FAQ Categories</span>
                <svg
                  :class="['w-5 h-5 text-gray-500 transition-transform duration-200', mobileNavOpen ? 'rotate-180' : '']"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <!-- Mobile Navigation Menu (Hidden on desktop) -->
            <div v-show="mobileNavOpen" class="md:hidden mb-8 bg-white rounded-lg shadow-sm p-4 col-span-12">
              <nav class="space-y-1">
                <ul class="space-y-1">
                  <li v-for="category in categories" :key="category.id">
                    <a
                      href="#"
                      @click.prevent="setActiveCategory(category.id); toggleMobileNav()"
                      :class="['block px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-blue-600 transition-colors', activeCategory === category.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700']"
                    >
                      {{ category.name }}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <!-- Main FAQ Content -->
            <div class="col-span-12 md:col-span-9 lg:col-span-9 xl:col-span-9 bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <!-- 按分类显示FAQ内容 -->
              <div v-for="category in filteredCategories" :key="category.id" class="mb-12 scroll-mt-32 pt-4">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">{{ category.name }}</h2>
                <div class="space-y-4">
                  <div 
                    v-for="(faq, index) in category.faqs" 
                    :key="`${category.id}-${index}`"
                    class="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <button
                      @click="toggleFaq(`${category.id}-${index}`)"
                      class="flex justify-between items-start w-full text-left p-6 focus:outline-none group bg-white hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div class="flex items-start">
                        <svg class="w-5 h-5 mr-3 text-blue-600 mt-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                        </svg>
                        <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{{ faq.question }}</h3>
                      </div>
                      <svg 
                        :class="[
                          'w-5 h-5 text-gray-400 transform transition-transform duration-200 mt-1 flex-shrink-0',
                          openFaqs[`${category.id}-${index}`] ? 'rotate-180' : ''
                        ]"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                      >
                        <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <div v-show="openFaqs[`${category.id}-${index}`]" class="px-6 pb-6 bg-gray-50 border-t border-gray-200">
                      <div class="pt-4 text-gray-700 leading-relaxed prose prose-gray max-w-none" v-html="faq.answer"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- CTA Section -->
              <div class="text-center mt-16">
                <button
                  @click="scrollToGenerator"
                  class="inline-flex items-center px-8 py-4 bg-blue-button hover:bg-blue-buttonhover text-white rounded-lg font-medium text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  aria-label="Start creating with GPTOSS2"
                >
                  Start Creating Today
                  <svg 
                    class="ml-2 w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSeo } from '~/composables/useSeo';
import { useRouter } from 'vue-router';

const router = useRouter();
defineOptions({
  name: 'FaqPage'
})

// SEO data
useSeo({
  title: 'GPTOSS2 FAQ - Help & Support Center',
  description: 'Find answers to common questions about GPTOSS2. Get help with using our AI platform, troubleshooting issues, and maximizing your creative potential.',
})

// FAQ数据
const faqData = ref([
  {
    id: 'product-basics',
    name: 'Product Basics',
    faqs: [
      {
        question: 'What is GPTOSS2?',
        answer: '<p>GPTOSS2 is a powerful AI platform that allows you to create stunning, high-quality content from text prompts or by transforming existing media. Our advanced open-weight AI capabilities enable you to generate artwork, concept designs, marketing visuals, social media content, and more with incredible detail and artistic quality.</p>'
      },
      {
        question: 'Who is GPTOSS2 for?',
        answer: '<p>GPTOSS2 is perfect for anyone looking to enhance their creative workflow with AI assistance. Whether you\'re a designer, marketer, content creator, entrepreneur, or hobbyist, our platform provides powerful tools to bring your ideas to life quickly and efficiently. No advanced technical skills are required - just your creativity!</p>'
      }
    ]
  },
  {
    id: 'features-performance',
    name: 'Features & Performance',
    faqs: [
      {
        question: 'What can I create with GPTOSS2?',
                 answer: `<p>With GPTOSS2, you can generate a wide range of content including:</p>
<ul class="list-disc pl-5 space-y-1">
  <li>High-quality images from text prompts</li>
  <li>Artistic transformations of existing images</li>
  <li>Short video clips with realistic motion</li>
  <li>Creative writing and copy</li>
  <li>Conceptual designs and illustrations</li>
  <li>Social media graphics and marketing visuals</li>
</ul>`
      },
      {
        question: 'How good is the quality of GPTOSS2 outputs?',
        answer: '<p>GPTOSS2 delivers exceptional quality that rivals professional creative work. Our advanced AI models produce highly detailed, realistic, and artistic outputs with impressive consistency. The quality improves with more specific prompts, and our platform offers multiple style options to match your creative vision. Many users find that GPTOSS2 outputs require minimal editing before use in professional settings.</p>'
      }
    ]
  },
  {
    id: 'usage-process',
    name: 'Usage Process',
    faqs: [
      {
        question: 'How do I use GPTOSS2?',
                 answer: `<p>Using GPTOSS2 is simple and intuitive:</p>
<ol class="list-decimal pl-5 space-y-1">
  <li>Sign up for an account and purchase credits</li>
  <li>Select the type of content you want to generate</li>
  <li>Enter a detailed text prompt describing your vision</li>
  <li>Click "Generate" and wait for your content to be created</li>
  <li>Review, download, or further refine your output</li>
</ol>`
      },
      {
        question: 'What happens after I generate content?',
                 answer: `<p>Once your content is generated, you can:</p>
<ul class="list-disc pl-5 space-y-1">
  <li>Preview it directly in your browser</li>
  <li>Download it to your device in high quality</li>
  <li>Generate variations based on the same prompt</li>
  <li>Save it to your account for later access</li>
</ul>
<p>Your generated content remains accessible in your account dashboard, and you retain full rights to use it as needed.</p>`
      }
    ]
  },
  // {
  //   id: 'pricing-credits',
  //   name: 'Pricing & Credits',
  //   faqs: [
  //     {
  //       question: 'How much does GPTOSS2 cost?',
  //       answer: '<p>GPTOSS2 uses a flexible credit-based pricing system. You purchase credit packages that never expire, giving you complete control over your spending. Prices start from $10 for 100 credits, with larger packages offering better value. Different types of generation consume different amounts of credits, with more complex tasks like video generation requiring more credits than image generation.</p>'
  //     }
  //   ]
  // },
  {
    id: 'copyright-commercial',
    name: 'Copyright & Commercial Use',
    faqs: [
      {
        question: 'Can I use GPTOSS2 outputs for commercial projects?',
        answer: '<p>Yes! All GPTOSS2 users receive a commercial license for the content they generate. This means you can use your creations in marketing campaigns, product designs, client work, social media, and any other for-profit venture. However, you may not use GPTOSS2 to create content that infringes on third-party rights or violates our content policy.</p>'
      }
    ]
  },
  {
    id: 'content-guidelines',
    name: 'Content Guidelines',
    faqs: [
      {
        question: 'What content am I not allowed to create?',
                 answer: `<p>You may not use GPTOSS2 to create content that:</p>
<ul class="list-disc pl-5 space-y-1">
  <li>Is illegal, harmful, or dangerous</li>
  <li>Violates intellectual property rights</li>
  <li>Contains hate speech or discrimination</li>
  <li>Is sexually explicit or pornographic</li>
  <li>Depicts violence or harm to individuals</li>
  <li>Infringes on privacy rights</li>
  <li>Impersonates others without consent</li>
  <li>Promotes illegal activities</li>
</ul>
<p>Our content policy is designed to ensure GPTOSS2 is used responsibly and ethically. Violations may result in account suspension.</p>`
      }
    ]
  },
  {
    id: 'payment-support',
    name: 'Payment & Support',
    faqs: [
      {
        question: 'How do I pay for GPTOSS2?',
        answer: '<p>GPTOSS2 accepts all major credit and debit cards through our secure payment processor. We also plan to add support for additional payment methods in the future. All transactions are processed securely, and your payment information is never stored on our servers.</p>'
      },
             {
         question: 'What if I need help or have issues?',
         answer: '<p>Our support team is here to help! You can reach us through:</p><ul class="list-disc pl-5 space-y-1"><li>Email support at support@gptoss2.com</li></ul><p>We strive to respond to all inquiries within 24 hours and are committed to resolving any issues you may encounter.</p>'
       }
    ]
  }
]);

// 分类列表
const categories = computed(() => 
  faqData.value.map(category => ({ id: category.id, name: category.name }))
);

// 根据当前选中的分类筛选显示的内容
const filteredCategories = computed(() => {
  return faqData.value.filter(category => category.id === activeCategory.value);
});

// Track expanded state of each FAQ item
const openFaqs = ref<Record<string, boolean>>({});

// Track active category - default to first category
const activeCategory = ref(faqData.value[0]?.id || 'product-basics');

// Set active category and expand all FAQs in that category
const setActiveCategory = (category: string) => {
  activeCategory.value = category;

  // Close all FAQs first
  openFaqs.value = {};

  // Expand all FAQs in the selected category
  const selectedCategory = faqData.value.find(cat => cat.id === category);
  if (selectedCategory) {
    selectedCategory.faqs.forEach((_, index) => {
      openFaqs.value[`${category}-${index}`] = true;
    });
  }
};

// 初始化页面，展开第一个分类的FAQ
const initializePage = () => {
  const firstCategory = faqData.value[0];
  if (firstCategory) {
    activeCategory.value = firstCategory.id;
    firstCategory.faqs.forEach((_, index) => {
      openFaqs.value[`${firstCategory.id}-${index}`] = true;
    });
  }
};

// Mobile navigation state
const mobileNavOpen = ref(false);

// Toggle the expanded/collapsed state of FAQ item
const toggleFaq = (faqKey: string) => {
  openFaqs.value[faqKey] = !openFaqs.value[faqKey];
};

// Toggle mobile navigation
const toggleMobileNav = () => {
  mobileNavOpen.value = !mobileNavOpen.value;
};

// Scroll to generator page
const scrollToGenerator = () => {
  router.push('/');
};

// 初始化页面
initializePage();
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

/* Custom scrollbar for better UX */
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

/* Responsive adjustments */
@media (max-width: 1024px) {
  .scroll-mt-20 {
    scroll-margin-top: 4rem;
  }
}

@media (max-width: 640px) {
  .scroll-mt-20 {
    scroll-margin-top: 3rem;
  }
}

/* Highlight active section in navigation */
.category-link {
  @apply block px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200;
}

.category-link:hover {
  @apply bg-gray-50 text-gray-900;
}

.category-link.active-section {
  @apply bg-blue-50 text-blue-600 font-semibold;
}

.faq-item {
  @apply border border-gray-200 rounded-lg mb-4 overflow-hidden transition-shadow duration-200;
}

.faq-item:hover {
  @apply shadow-md;
}

.faq-question {
  @apply flex justify-between items-center w-full px-6 py-4 text-left bg-white cursor-pointer;
}

.faq-answer {
  @apply px-6 py-4 bg-gray-50 border-t border-gray-200;
}
</style>