<template>
  <header id="intro" class="hero mt-[80px]">
    <div class="container ">
      <h1>GPT-OSS: A New Era of Open AI</h1>
    <p>
      Released on August 5, 2025, GPT-OSS marks OpenAI's return to open-weight models. 
      It includes <strong>GPT-OSS-120B</strong> and <strong>GPT-OSS-20B</strong>, engineered for sophisticated chain-of-thought reasoning. 
      This isn't just a model; it's a new foundation for trustworthy AI.
    </p>
      <!-- <a href="#pricing" class="cta-button">Get Started for Free</a> -->
    </div>
  </header>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
.hero {
  background-color: var(--color-bg-dark);
  color: var(--color-text-light);
  text-align: center;
  padding: 5rem 1.5rem;
  overflow: hidden;
}

.container {
  max-width: 960px;
  margin: 0 auto;
}

h1 {
  font-size: 3.2rem;
  margin: 0 auto 1rem;
  line-height: 1.3;
  font-weight: 700;
  white-space: nowrap;
  text-align: center;
  display: block;
}

p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 1rem auto 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.cta-button {
  display: inline-block;
  background-color: var(--color-primary);
  color: #ffffff;
  padding: 0.8rem 2.2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.cta-button:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-3px);
  box-shadow: 0 4px 15px var(--color-shadow-primary);
}

/* 移动端优化 */
@media (max-width: 768px) {
  .hero {
    padding: 3rem 1rem;
  }
  
  h1 {
    font-size: 2rem;
    white-space: normal;
    line-height: 1.2;
  }
  
  p {
    font-size: 1rem;
    max-width: 100%;
    margin: 1rem auto 1.5rem;
  }
  
  .cta-button {
    font-size: 1rem;
    padding: 0.7rem 1.8rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 2.5rem 0.75rem;
  }
  
  h1 {
    font-size: 1.8rem;
  }
  
  p {
    font-size: 0.95rem;
  }
}
</style>