<template>
  <section id="features" class="py-20 bg-blue-pale">
    <div class="max-w-7xl mx-auto px-6">
      
      <!-- Section Headline -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-blue-dark mb-6">More Than AI. It's A New Architecture.</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the core architecture, aesthetic training, and massive dataset that empower Wan 2.2 Plus industry-leading performance.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-3 gap-8">
        
        <!-- Feature Cards -->
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-6">
            <!-- Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" :d="feature.iconPath" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ feature.title }}</h3>
          <p class="text-gray-600">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 核心优势配置
const features = [
  {
    title: "Fast Video Generation with Wan 2.2 Plus",
    description: "Wan 2.2 Plus dramatically speeds up your workflow, generating 480p videos in about 1 minute and 1080p in just 2 minutes—perfect for fast prototyping and creative iteration.",
    iconPath: "M3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0zm8.25-4.5v5.25l3.5 2.1"
  },
  {
    title: "Smarter Semantic Precision",
    description: "Built on the upgraded architecture of Wan 2.2 Plus, the model excels at semantic understanding and instruction following. Generate videos with higher spatial accuracy, dynamic interactions, and multi-object coherence—all from a single prompt.",
    iconPath: "M12 3.75l8.25 8.25-8.25 8.25L3.75 12 12 3.75zm0 3v4.5h4.5"
  },
  {
    title: "Cinematic Visual Language Mastery",
    description: "Wan 2.2 Plus is trained to understand the nuances of cinematic storytelling—from lighting and color to composition and shot design. Easily create mood-rich, visually stunning videos with fine artistic control.",
    iconPath: "M6 4.5h12a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18V6A1.5 1.5 0 016 4.5z"
  },
  {
    title: "Advanced MoE Architecture",
    description: "Wan 2.2 Plus Mixture-of-Experts (MoE) architecture divides tasks among specialized AI models. This boosts model power and detail, delivering higher-quality video without increasing computational cost.",
    iconPath: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
  },
  {
    title: "True Cinematic Aesthetics",
    description: "Trained on a vast library of data labeled for lighting, composition, and color, our AI understands the language of film, giving you precise control over the artistic style and mood of your video.",
    iconPath: "M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z"
  },
  {
    title: "Complex & Dynamic Motion",
    description: " Powered by a massive training dataset (+83% more video), Wan 2.2 Plus excels at generating complex and physically believable motion, with performance that rivals top closed-source models.",
    iconPath: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
  }
]
</script>

<style scoped>
/* Scoped styles can be added here if necessary, though Tailwind CSS is used primarily. */
</style>