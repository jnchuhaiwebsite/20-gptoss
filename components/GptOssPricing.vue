<template>
  <section id="pricing" class="section container">
    <h2>Simple, Transparent Pricing</h2>
    <p class="subtitle">
      Choose the Plan That Fits Your Needs. Start for free and scale as you grow.
    </p>
    <div class="table-wrapper">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Plan Type</th>
            <th>Features</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Free Plan</strong></td>
            <td>Free credits on signup to experience GPT-OSS; Access to public Prompt Template Library.</td>
            <td><strong>Free</strong></td>
          </tr>
          <tr>
            <td><strong>Basic Plan</strong></td>
            <td>Generous monthly chat allowance; Use of Prompt Templates and Generator.</td>
            <td><strong>$10 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Pro Plan</strong></td>
            <td>RAG support, custom Prompt management, chat history export, and priority support.</td>
            <td><strong>$30 / month</strong></td>
          </tr>
          <tr>
            <td><strong>Super Plan</strong></td>
            <td>Prompt Fine-Tuning services, industry knowledge base integration, and a dedicated SLA.</td>
            <td><strong>$99 / month</strong></td>
          </tr>
        </tbody>
      </table>
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
  color: #000000;
  font-weight: 700;
  line-height: 1.3;
}

.subtitle {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #333333;
  font-size: 1.1rem;
  line-height: 1.6;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border: 1px solid #e0e0e0;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table th, .styled-table td {
  padding: 1.2rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.styled-table th {
  background-color: #000000;
  color: #ffffff;
  font-weight: 700;
}

.styled-table tr:last-child td {
  border-bottom: none;
}

.styled-table td:first-child {
  font-weight: 600;
  color: #000000;
}

.styled-table td strong {
  color: #000000;
}

.styled-table td {
  color: #000000;
}

.styled-table td:last-child {
  white-space: nowrap;
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