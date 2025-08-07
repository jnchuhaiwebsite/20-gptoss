<template>
  <section class="section final-cta">
    <div class="container">
      <h2>Ready to Build with gpt-oss?</h2>
      <p class="cta-description">
        Join the new wave of AI development with a model that prioritizes your privacy and empowers your creativity. Get started in seconds.
      </p>
      <a href="#pricing" class="cta-button">Start Your Free Trial Now</a>
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

.final-cta {
  background-color: #eef2ff;
  text-align: center;
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

.cta-description {
  max-width: 600px;
  margin: 1rem auto 2rem;
  color: #555;
  font-size: 1.1rem;
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
  h2 {
    font-size: 1.8rem;
  }
  
  .cta-description {
    font-size: 1rem;
  }
}
</style> 