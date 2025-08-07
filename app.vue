<script setup lang="ts">
import { useNotificationStore } from '~/stores/notification'
import NotificationList from '~/components/NotificationList.vue'
import LoginPromptModal from '~/components/LoginPromptModal.vue'
import StatisticsTracker from '~/components/StatisticsTracker.vue'

const notificationStore = useNotificationStore() 

</script>

<template>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NotificationList />
    <LoginPromptModal />
    <StatisticsTracker />
</template>

<style>
/* 主题色 */
:root {
  /* 主题色 - 紫色 */
  --theme-primary: #ec2657;
  --theme-primary-hover: #f3a943;
  
  /* 文字颜色 */
  --text-primary: #ec2657;
  --text-secondary: #f3a943;
  
  /* 背景和边框 */
  --bg-primary: #F5F7FA;
  --bg-secondary: #e6e2de;
  
  /* 组件使用的颜色变量 */
  --color-bg-dark: #1a1a2e;
  --color-text-light: #ffffff;
  --color-primary: #284bfb;
  --color-primary-hover: #4a47a3;
  --color-shadow-primary: rgba(97, 94, 255, 0.4);
}

/* 主题色相关的通用类 */
.text-theme {
  color: var(--theme-primary);
}

.bg-theme {
  background-color: var(--theme-primary);
}

/* 修改hover-theme全局效果 */
.hover-theme:hover {
  background-color: var(--theme-primary-hover) !important;
}

/* 添加文本hover类 */
.hover-text-theme:hover {
  color: var(--theme-primary);
}

/* 博客相关样式 */
.blog-page-gradient {
  background-image: linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary));
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.main-content {
  flex: 1 0 auto;
}
</style>
