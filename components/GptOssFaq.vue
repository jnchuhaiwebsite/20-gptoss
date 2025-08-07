<template>
  <section id="faq" class="section container">
    <h2>FAQ - gpt-oss</h2>
    <p class="subtitle">
 Find answers to common questions about gpt-oss.
    </p>
    <div class="faq-item">
      <strong>How do you ensure the quality and safety of AI outputs?</strong>
      <p>We use a multi-layered approach combining RAG for factual accuracy, content filters, visualized reasoning paths for auditing, and human review to maintain high standards of quality and compliance.</p>
    </div>
    <div class="faq-item">
      <strong>What if I'm not good at writing prompts?</strong>
      <p>You don't have to be! Our platform is built to help. Use our template library, let the Prompt Generator build one for you, or use our optimization tips to improve your own.</p>
    </div>
    <div class="faq-item">
      <strong>How is my privacy and data security protected?</strong>
      <p>Your security is our top priority. All inference happens in a controlled environment or on your local machine. We use strict account isolation and never call third-party services with your data.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
.section {
  padding: 4rem 0;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

h2 {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #1a1a2e;
  font-weight: 700;
  line-height: 1.3;
}

.subtitle {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6;
}

.faq-item {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 4px solid #284bfb;
}

.faq-item strong {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #1a1a2e;
}

.faq-item p {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }
  
  .container {
    padding: 1.5rem 1rem;
  }
  
  h2 {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .faq-item {
    padding: 1.25rem;
    margin-bottom: 0.75rem;
  }
  
  .faq-item strong {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 2rem 0;
  }
  
  .container {
    padding: 1rem 0.75rem;
  }
  
  h2 {
    font-size: 1.6rem;
  }
  
  .subtitle {
    font-size: 0.95rem;
  }
  
  .faq-item {
    padding: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .faq-item strong {
    font-size: 0.95rem;
  }
}
</style> 