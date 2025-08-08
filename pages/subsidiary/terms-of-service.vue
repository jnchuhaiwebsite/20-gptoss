<template>
  <div class="min-h-screen bg-blue-pale">
    <div class="max-w-4xl mx-auto px-4 py-12">
      <div class="mb-6">
        <NuxtLink to="/" class="flex items-center text-blue-navtext hover:text-blue-pricinghover transition-colors duration-200">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </NuxtLink>
      </div>

      <h1 class="text-4xl lg:text-5xl font-extrabold leading-tight mb-8 text-blue-h1">Terms of Service</h1>
      <p class="text-blue-footertext mb-8 text-lg">Effective Date: {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
      
      <div class="space-y-6 text-blue-footertext leading-relaxed">
        <section>
          <h2 class="text-2xl font-bold mb-4 text-blue-h1">1. Acceptance of Terms</h2>
          <p>By accessing or using GPTOSS2 (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access our Service.</p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-blue-h1">2. Service Description</h2>
          <p>GPTOSS2 provides an advanced AI-powered service for creating content. Key features include:</p>
          <ul class="list-disc pl-6 mt-2 space-y-2">
            <li><strong class="text-blue-button">AI Generation:</strong> Converting descriptive text prompts into various types of content.</li>
            <li><strong class="text-blue-button">Advanced Creative Control:</strong> The ability to influence creative elements through detailed prompts.</li>
            <li><strong class="text-blue-button">High-Quality Output:</strong> Support for multiple formats and specifications to fit your project needs.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-blue-h1">3. User Responsibilities</h2>
          <p>As a user of our Service, you agree to:</p>
          <ul class="list-disc pl-6 mt-2 space-y-2">
            <li>Provide accurate and current information for your account.</li>
            <li>Maintain the security of your account and safeguard your login credentials.</li>
            <li>Use the Service in compliance with all applicable laws and regulations.</li>
            <li>Ensure that any text prompts or images you upload ("Input Content") are lawful and do not infringe on the rights of others.</li>
            <li>Not engage in any activity that could harm, disrupt, or impair the Service.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-blue-h1">4. Intellectual Property Rights</h2>
          <p>Your content is yours. You retain full ownership of your Input Content. Furthermore, <strong class="text-blue-button">you own the rights to the content you generate</strong> ("Generated Content") and can use them for any personal or commercial purpose.</p>
          <p class="mt-2">By using the Service, you grant GPTOSS2 a limited, worldwide, non-exclusive, royalty-free license to use, process, and store your Input Content solely for the purpose of providing and improving the Service for you. We are not responsible for the originality of Generated Content or its potential similarity to existing works.</p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-blue-h1">5. Service Limitations</h2>
          <ul class="list-disc pl-6 mt-2 space-y-2">
            <li><strong class="text-blue-button">Usage Model:</strong> Service usage is measured according to the selected plan and features used.</li>
            <li><strong class="text-blue-button">Supported Language:</strong> English prompts are strongly recommended for optimal and predictable results.</li>
            <li><strong class="text-blue-button">Processing Time:</strong> Generation time may vary depending on the selected options and server load.</li>
            <li><strong class="text-blue-button">Fair Use:</strong> While we encourage creativity, automated, high-volume, or abusive usage patterns may be throttled to ensure service quality for all users.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-blue-h1">6. Prohibited Content</h2>
          <p>You may not create or upload content that is:</p>
          <ul class="list-disc pl-6 mt-2 space-y-2">
            <li>Illegal, fraudulent, or harmful.</li>
            <li>Infringing on copyright, trademark, or other intellectual property rights.</li>
            <li>Sexually explicit, pornographic, or depicting non-consensual sexual content.</li>
            <li>Extremely violent, graphic, or promoting self-harm.</li>
            <li>Hate speech, discriminatory, or harassing.</li>
            <li>Intended to deceive or spread misinformation (e.g., deepfakes for malicious purposes).</li>
            <li>In violation of an individual's privacy.</li>
          </ul>
           <p class="mt-2">We reserve the right to suspend or terminate accounts that violate these content restrictions.</p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-blue-h1">7. Subscription and Payment Terms</h2>
          <p>We offer various service tiers to meet your needs:</p>
          <ul class="list-disc pl-6 mt-2 space-y-2">
            <li><strong class="text-blue-button">Free Trial:</strong> New users receive a complimentary allocation to test the service.</li>
            <li><strong class="text-blue-button">Paid Plans:</strong> Subscriptions provide recurring monthly benefits and access to premium features.</li>
            <li>All subscription fees are processed securely through our payment provider. Specific terms for plans are detailed on our pricing page.</li>
            <li>Subscription fees are non-refundable except as required by applicable law or as outlined in our refund policy.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-blue-h1">8. Service Modifications and Termination</h2>
          <p>We reserve the right to modify or discontinue our Service at any time. We will provide reasonable notice of any significant changes that may adversely affect you. We may suspend or terminate your account immediately and without notice for any violation of these Terms.</p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-blue-h1">9. Disclaimer of Warranties</h2>
          <p>The Service is provided on an "as is" and "as available" basis without warranties of any kind. We do not guarantee that the Service will be uninterrupted, error-free, or that the generated results will meet your specific expectations or be suitable for any particular purpose.</p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-blue-h1">10. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, GPTOSS2 shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising from your use of the Service.</p>
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4 text-blue-h1">11. Contact Information</h2>
          <p>For any questions regarding these Terms of Service, please contact us at: <strong class="text-blue-button">support@www.gptoss2.com</strong></p>
        </section>

        <section class="mt-8">
          <p class="text-sm">Last updated: {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '~/composables/useSeo';

// @ts-ignore: Nuxt macro function
definePageMeta({
  layout: false,
  name: 'terms-of-service'
})

useSeo({
  title: 'Terms of Service | GPTOSS2',
  description: 'Review the terms and conditions for using GPTOSS2, the powerful open-weight AI platform providing secure and private interactions.'
})
</script>

<style>
/* Scoped or global styles can be added here if needed, but Tailwind CSS is used primarily. */
</style>