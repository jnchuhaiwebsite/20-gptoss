<template>
  <section id="for-whom" class="section container">
    <h2>Built for Innovators, Built for You</h2>
    <p class="subtitle">
      Empowering Your Vision, Securely. GPT-OSS provides a versatile and secure AI toolkit for professionals across industries.
    </p>
    <div class="grid">
      <div class="card">
        <h3>For Customer Service Teams</h3>
        <p>Automate responses and guide users with an AI that understands context and process.</p>
      </div>
      <div class="card">
        <h3>For Education & Students</h3>
        <p>Explain complex topics, offer step-by-step problem-solving, and provide constructive writing feedback.</p>
      </div>
      <div class="card">
        <h3>For Developers & Engineers</h3>
        <p>Generate code, debug complex issues, and learn new frameworks with a reliable, private coding partner.</p>
      </div>
      <div class="card">
        <h3>For Creators & Marketers</h3>
        <p>Brainstorm ideas, draft compelling copy, and summarize research, all within a secure environment.</p>
      </div>
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.07);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.card h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  color: #284bfb;
  font-weight: 700;
}

.card p {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

@media (max-width: 768px) {
  h2 {
    font-size: 1.8rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
}
</style> 