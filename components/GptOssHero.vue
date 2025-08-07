<template>
  <header class="hero">
    <div class="container ">
      <h1>gpt-oss: Advanced AI. Total Privacy.</h1>
      <p>Your Data Stays Yours. The first open-weight model from OpenAI since 2019, built for secure, on-premise inference and complex reasoning.</p>
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
}

.container {
  max-width: 960px;
  margin: 0 auto;
}

h1 {
  font-size: 3.2rem;
  margin: 0;
  line-height: 1.3;
  font-weight: 700;
  margin-bottom: 1rem;
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

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  
  .hero {
    padding: 4rem 1.5rem;
  }
}
</style>