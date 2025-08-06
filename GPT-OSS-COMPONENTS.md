# GPT-OSS 组件说明

本文档列出了根据提供的HTML代码创建的Vue组件。

## 创建的组件

### 1. GptOssHero.vue
- **位置**: `components/GptOssHero.vue`
- **功能**: 主页面Hero区域，包含标题、描述和行动按钮
- **特点**: 深色背景，白色文字，响应式设计

### 2. GptOssIntro.vue
- **位置**: `components/GptOssIntro.vue`
- **功能**: GPT-OSS介绍部分
- **内容**: 介绍GPT-OSS作为OpenAI自2019年以来首个开源权重模型

### 3. GptOssForWhom.vue
- **位置**: `components/GptOssForWhom.vue`
- **功能**: 适用人群展示
- **内容**: 展示四个主要用户群体（客服团队、教育学生、开发者工程师、创作者营销者）

### 4. GptOssAdvantages.vue
- **位置**: `components/GptOssAdvantages.vue`
- **功能**: 核心优势展示
- **内容**: 四个主要优势（私有系统推理、强大的多步逻辑、灵活部署、商业友好许可）

### 5. ModelComparisonTable.vue
- **位置**: `components/ModelComparisonTable.vue`
- **功能**: 模型性能对比表格
- **内容**: 展示GPT-OSS与其他领先模型的性能对比数据

### 6. PromptSolutions.vue
- **位置**: `components/PromptSolutions.vue`
- **功能**: 提示解决方案展示
- **内容**: 三个主要功能（提示模板库、引导式提示生成器、实时优化）

### 7. GptOssPricing.vue
- **位置**: `components/GptOssPricing.vue`
- **功能**: 定价方案展示
- **内容**: 四个定价方案（免费版、基础版、专业版、超级版）

### 8. GptOssFaq.vue
- **位置**: `components/GptOssFaq.vue`
- **功能**: 常见问题解答
- **内容**: 三个主要FAQ（AI输出质量安全、提示写作、隐私数据安全）

### 9. GptOssFinalCta.vue
- **位置**: `components/GptOssFinalCta.vue`
- **功能**: 最终行动号召
- **内容**: 鼓励用户开始使用GPT-OSS的最终呼吁

## 页面集成

所有组件已在 `pages/index.vue` 中集成，按照以下顺序排列：

1. GptOssHero - 主标题区域
2. GptOssIntro - 介绍部分
3. GptOssForWhom - 适用人群
4. GptOssAdvantages - 核心优势
5. ModelComparisonTable - 模型对比
6. PromptSolutions - 提示解决方案
7. GptOssPricing - 定价方案
8. GptOssFaq - 常见问题
9. GptOssFinalCta - 最终行动号召

## 样式特点

- 使用Inter字体
- 响应式设计，支持移动端
- 统一的颜色方案（主色调：#284bfb）
- 卡片式布局，带有悬停效果
- 表格样式优化，支持横向滚动

## 配置更新

- 更新了 `nuxt.config.ts` 中的SEO信息
- 添加了Inter字体链接
- 更新了页面标题和描述
- 修改了canonical URL

## 使用说明

所有组件都是独立的Vue组件，可以在其他页面中复用。每个组件都包含：
- 模板部分（template）
- 脚本部分（script setup）
- 样式部分（scoped style）

组件采用响应式设计，在不同屏幕尺寸下都能正常显示。 