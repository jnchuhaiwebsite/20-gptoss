<template>
  <section id="advantages" class="section container">
    <h2>Core Advantages: The GPT-OSS Difference</h2>
    <p class="subtitle">
      Authority in Action: Security, Performance, and Flexibility.
    </p>
    <div class="grid">
      <div class="card">
          <h3><span>🛡️</span>Airtight Data Privacy</h3>
          <p>Your conversations and data never leave your control. All inference runs in your private environment or on-premise, with <strong>zero external API calls</strong>. This is our non-negotiable promise of security.</p>
      </div>
      
      <div class="card">
          <h3><span>🧠</span>Transparent & Powerful Logic</h3>
          <p>Go beyond simple answers. GPT-OSS uses chain-of-thought to tackle complex problems, showing you its reasoning step-by-step. This makes outputs not only smarter but also fully verifiable.</p>
      </div>

      <div class="card">
          <h3><span>✅</span>Auditable & Responsible by Design</h3>
          <p>Trust is built-in. With features like <strong>reasoning path visualization</strong>, simulated abuse testing, and external expert audits, GPT-OSS provides the tools you need for safe and responsible deployment.</p>
      </div>

      <div class="card">
          <h3><span>💼</span>Unrestricted Commercial Use</h3>
          <p>Innovate without limits. The content you generate is yours to commercialize. Our <strong>business-friendly license</strong> empowers you to build products and services on GPT-OSS with legal peace of mind.</p>
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
  grid-template-columns: repeat(2, 1fr);
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
  
  .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .card {
    padding: 1.5rem;
  }
  
  .card h3 {
    font-size: 1.2rem;
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
  
  .card {
    padding: 1.25rem;
  }
  
  .card h3 {
    font-size: 1.1rem;
  }
}
</style> 