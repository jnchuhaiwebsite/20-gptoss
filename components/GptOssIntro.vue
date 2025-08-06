<template>
  <header id="intro" class="hero mt-[80px]">
    <div class="container ">
      <h1>GPT-OSS: A New Era of Open AI</h1>
    <p>
      Expertise You Can Download. Released on August 5, 2025, GPT-OSS marks OpenAI's return to open-weight models. 
      It includes <strong>gpt-oss-120B</strong> and <strong>gpt-oss-20B</strong>, engineered for sophisticated chain-of-thought reasoning. 
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
  background-color: #1a1a2e;
  color: #ffffff;
  text-align: center;
  padding: 5rem 1.5rem;
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
  background-color: #284bfb;
  color: #ffffff;
  padding: 0.8rem 2.2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.cta-button:hover {
  background-color: #4a47a3;
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(97, 94, 255, 0.4);
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  
  .hero {
    padding: 4rem 1.5rem;
  }
}
</style> 