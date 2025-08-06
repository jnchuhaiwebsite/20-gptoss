<template>
  <section id="comparison" class="section container">
    <h2>GPT-OSS vs. Other Leading Models</h2>
    <p class="subtitle">
      See how GPT-OSS stacks up against industry benchmarks. The data demonstrates its superior performance in complex tasks.
    </p>
    <div class="table-wrapper">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Benchmark</th>
            <th>GPT-OSS-120b</th>
            <th>GPT-OSS-20b</th>
            <th>OpenAI o3</th>
            <th>OpenAI o4-mini</th>
          </tr>
        </thead>
        <tbody>
          <tr class="category-row">
            <td colspan="5">Reasoning & Knowledge</td>
          </tr>
          <tr>
            <td>MMLU</td>
            <td>90</td>
            <td>85.3</td>
            <td>93.4</td>
            <td>93</td>
          </tr>
          <tr>
            <td>GPQA Diamond</td>
            <td>80.9</td>
            <td>74.2</td>
            <td>77</td>
            <td>81.4</td>
          </tr>
          <tr>
            <td>Human-Level Ultimate Test</td>
            <td>19</td>
            <td>17.3</td>
            <td>24.9</td>
            <td>17.7</td>
          </tr>
          <tr class="category-row">
            <td colspan="5">Competition Math</td>
          </tr>
          <tr>
            <td>AIME 2024</td>
            <td>96.6</td>
            <td>96</td>
            <td>91.6</td>
            <td>93.4</td>
          </tr>
          <tr>
            <td>AIME 2025</td>
            <td>97.9</td>
            <td>98.7</td>
            <td>88.9</td>
            <td>92.7</td>
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

.styled-table td {
  color: #000000;
}

.styled-table .category-row td {
  background-color: #f5f5f5;
  font-weight: 700;
  color: #000000;
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
  
  .table-wrapper {
    border-radius: 8px;
    margin: 0 -0.5rem;
  }
  
  .styled-table th, .styled-table td {
    padding: 0.8rem 0.5rem;
    font-size: 0.9rem;
  }
  
  .styled-table th {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 2rem 0;
  }
  
  .container {
    padding: 1rem 0.5rem;
  }
  
  h2 {
    font-size: 1.6rem;
  }
  
  .subtitle {
    font-size: 0.95rem;
  }
  
  .styled-table th, .styled-table td {
    padding: 0.6rem 0.4rem;
    font-size: 0.8rem;
  }
  
  .styled-table th {
    font-size: 0.75rem;
  }
}
</style> 