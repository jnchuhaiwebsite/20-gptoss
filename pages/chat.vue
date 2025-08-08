<template>
  <div class="mt-[80px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans" style="height: calc(100vh - 80px);">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex">
      
      <!-- Sidebar -->
      <aside class="flex-shrink-0 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-72 flex flex-col">
        <div class="p-4 flex-grow flex flex-col">
          <h2 class="text-lg font-semibold mb-4">GPT-Oss Chat</h2>
          <button @click="createNewChat" class="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center justify-center mb-6">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            New Chat
          </button>
          <div class="flex-grow overflow-y-auto">
            <!-- Recent chats -->
            <div class="space-y-2">
              <h3 class="text-sm font-semibold text-gray-500 mb-3">Recent Chats</h3>
              <div v-for="chat in chatHistory" :key="chat.id" 
                   @click="loadChat(chat.id)"
                   class="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                   :class="{ 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700': currentChatId === chat.id }">
                <div class="flex items-start justify-between">
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{{ chat.title }}</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">{{ chat.lastMessage }}</p>
                  </div>
                  <span class="text-xs text-gray-400 ml-2">{{ chat.timestamp }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col">
        <!-- Header -->
        <header class="p-4 flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <!-- Model Selector -->
            <div class="relative model-selector">
              <button @click="modelSelectorOpen = !modelSelectorOpen" class="flex items-center space-x-2">
                <span class="text-xl font-semibold">{{ currentModel }}</span>
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div v-if="modelSelectorOpen" class="absolute mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                <div class="p-2">
                  <div v-for="model in availableModels" :key="model.id" 
                       @click="selectModel(model)"
                       class="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-medium text-gray-900 dark:text-gray-100">{{ model.name }}</div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">{{ model.description }}</div>
                      </div>
                      <div v-if="currentModel === model.name" class="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Chat Area -->
        <section class="flex-1 flex flex-col overflow-y-hidden">
          <!-- Welcome Screen -->
          <div v-if="messages.length === 0" class="flex-1 flex flex-col justify-center items-center text-center p-4 md:p-6">
            <h1 class="text-4xl font-bold mb-8">我能帮什么忙吗?</h1>
            <!-- Centered Input for new chat -->
            <div class="w-full max-w-2xl">
              <div class="relative bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl flex items-center p-2">
                <button class="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                </button>
                <textarea
                  v-model="newMessage"
                  @keydown="handleKeydown"
                  placeholder="询问任何问题"
                  class="w-full bg-transparent focus:outline-none resize-none mx-2"
                  rows="1"
                  ref="textarea"
                ></textarea>
                <button class="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                </button>
                <button @click="sendMessage" class="p-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-full hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none disabled:bg-gray-200 dark:disabled:bg-gray-700" :disabled="!newMessage.trim()">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Messages View -->
          <div v-else ref="messageContainer" class="flex-1 space-y-6 overflow-y-auto pb-4 p-4 md:p-6">
            <div v-for="message in messages" :key="message.id" class="flex" :class="message.isUser ? 'justify-end' : 'justify-start'">
              <div class="flex items-start gap-4 max-w-3xl" :class="message.isUser ? 'flex-row-reverse' : 'flex-row'">
                <!-- 用户头像 -->
                <div v-if="message.isUser" class="flex-shrink-0">
                  <img :src="userAvatar" alt="User Avatar" class="w-8 h-8 rounded-full object-cover">
                </div>
                <!-- AI头像 -->
                <img v-else src="/favicon.ico" alt="Bot" class="w-8 h-8 rounded-full shadow-md flex-shrink-0">
                <!-- 消息内容 -->
                <div class="rounded-xl p-4 text-base" :class="message.isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700'">
                  <p style="white-space: pre-wrap;">{{ message.text }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Bottom Input for ongoing chat -->
          <div v-if="messages.length > 0" class="p-4 md:p-6 pt-2 flex-shrink-0">
            <div class="relative bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl flex items-center p-2">
              <button class="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              </button>
              <textarea
                v-model="newMessage"
                @keydown="handleKeydown"
                placeholder="询问任何问题"
                class="w-full bg-transparent focus:outline-none resize-none mx-2"
                rows="1"
                ref="textarea"
              ></textarea>
              <button class="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
              </button>
              <button @click="sendMessage" class="p-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-full hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none disabled:bg-gray-200 dark:disabled:bg-gray-700" :disabled="!newMessage.trim()">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, onMounted, computed } from 'vue';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();

// 用户头像相关
const getUserAvatar = () => {
  // 服务器端渲染时返回null
  if (typeof window === 'undefined') return null;
  
  // 检查Cookie中是否有头像
  const cookies = document.cookie.split(';');
  const avatarCookie = cookies.find(cookie => cookie.trim().startsWith('user_avatar='));
  
  if (avatarCookie) {
    try {
      const avatarData = JSON.parse(decodeURIComponent(avatarCookie.split('=')[1]));
      const expireTime = avatarData.expireTime;
      
      // 检查是否过期
      if (expireTime && Date.now() < expireTime) {
        return avatarData.avatarUrl;
      } else {
        // 过期了，删除Cookie
        document.cookie = 'user_avatar=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    } catch (error) {
      console.error('解析头像Cookie失败:', error);
      // 删除损坏的Cookie
      document.cookie = 'user_avatar=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }
  
  return null;
};

const setUserAvatar = (avatarUrl) => {
  if (!avatarUrl || typeof window === 'undefined') return;
  
  // 设置1小时过期时间
  const expireTime = Date.now() + (60 * 60 * 1000); // 1小时
  const avatarData = {
    avatarUrl,
    expireTime
  };
  
  // 保存到Cookie
  document.cookie = `user_avatar=${encodeURIComponent(JSON.stringify(avatarData))}; max-age=3600; path=/;`;
};

// 获取用户头像的计算属性
const userAvatar = computed(() => {
  // 先从Cookie获取
  const cachedAvatar = getUserAvatar();
  if (cachedAvatar) {
    return cachedAvatar;
  }
  
  // Cookie中没有，从用户store获取
  if (userStore.userInfo?.avatar) {
    const avatarUrl = userStore.userInfo.avatar+"?width=64&height=64";
    setUserAvatar(avatarUrl);
    return avatarUrl;
  }
  
  // 都没有则返回默认头像
  return '/default-avatar.png';
});

const modelSelectorOpen = ref(false);
const messages = ref([]);
const messageContainer = ref(null);
const newMessage = ref('');
const textarea = ref(null);

// 模型相关
const currentModel = ref('GPT-Oss 4o');
const availableModels = [
  { id: 'gpt-oss-4o', name: 'GPT-Oss 4o', description: '最新版本，功能最强大' },
  { id: 'gpt-oss-4', name: 'GPT-Oss 4', description: '稳定版本，性能优秀' },
  { id: 'gpt-oss-3.5', name: 'GPT-Oss 3.5', description: '轻量版本，响应快速' }
];

const selectModel = (model) => {
  currentModel.value = model.name;
  modelSelectorOpen.value = false;
};

// 点击外部关闭模型选择器
const closeModelSelector = () => {
  modelSelectorOpen.value = false;
};

// 监听点击事件
onMounted(async () => {
  // 获取用户信息
  try {
    await userStore.fetchUserInfo();
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
  
  document.addEventListener('click', (e) => {
    const modelSelector = document.querySelector('.model-selector');
    if (modelSelector && !modelSelector.contains(e.target)) {
      closeModelSelector();
    }
  });
});

// 聊天记录列表
const chatHistory = ref([
  {
    id: 1,
    title: "如何提高工作效率？",
    lastMessage: "我理解您的问题。让我为您详细解答一下...",
    timestamp: "2024-01-15 14:30",
    messages: [
      { id: 1, text: "如何提高工作效率？", isUser: true },
      { id: 2, text: "我理解您的问题。让我为您详细解答一下...", isUser: false },
      { id: 3, text: "具体有哪些方法呢？", isUser: true },
      { id: 4, text: "这是一个很好的问题！根据我的分析，提高工作效率可以从以下几个方面入手：\n\n1. 时间管理：使用番茄工作法\n2. 任务优先级：重要且紧急的事情优先\n3. 减少干扰：关闭不必要的通知\n4. 定期休息：保持精力充沛", isUser: false }
    ]
  },
  {
    id: 2,
    title: "Vue.js 开发技巧",
    lastMessage: "这是一个很好的问题！根据我的分析...",
    timestamp: "2024-01-15 13:45",
    messages: [
      { id: 1, text: "Vue.js 有哪些开发技巧？", isUser: true },
      { id: 2, text: "这是一个很好的问题！根据我的分析，Vue.js 开发技巧包括：\n\n1. 使用 Composition API\n2. 合理使用 computed 和 watch\n3. 组件化开发\n4. 性能优化", isUser: false },
      { id: 3, text: "能详细说说 Composition API 吗？", isUser: true },
      { id: 4, text: "感谢您的提问。我可以为您提供以下建议...\n\nComposition API 是 Vue 3 的新特性，它提供了更好的逻辑复用和代码组织方式。主要优势包括：\n\n- 更好的 TypeScript 支持\n- 逻辑复用更容易\n- 代码更清晰易读", isUser: false }
    ]
  },
  {
    id: 3,
    title: "人工智能发展趋势",
    lastMessage: "感谢您的提问。我可以为您提供以下建议...",
    timestamp: "2024-01-15 12:20",
    messages: [
      { id: 1, text: "人工智能的发展趋势是什么？", isUser: true },
      { id: 2, text: "感谢您的提问。我可以为您提供以下建议...\n\n人工智能的发展趋势主要包括：\n\n1. 大语言模型的普及\n2. 多模态AI的发展\n3. AI在垂直领域的应用\n4. 边缘计算和AI的结合", isUser: false },
      { id: 3, text: "大语言模型会取代程序员吗？", isUser: true },
      { id: 4, text: "我明白您的需求。让我为您提供一些解决方案...\n\n大语言模型不会完全取代程序员，而是会成为程序员的强大工具。它会：\n\n- 提高开发效率\n- 辅助代码生成\n- 帮助问题诊断\n- 但需要人类进行创意和决策", isUser: false }
    ]
  },
  {
    id: 4,
    title: "前端性能优化",
    lastMessage: "我明白您的需求。让我为您提供一些解决方案...",
    timestamp: "2024-01-15 11:15",
    messages: [
      { id: 1, text: "前端性能优化的方法有哪些？", isUser: true },
      { id: 2, text: "我明白您的需求。让我为您提供一些解决方案...\n\n前端性能优化方法包括：\n\n1. 代码分割和懒加载\n2. 图片优化和压缩\n3. 缓存策略\n4. CDN 使用\n5. 减少 HTTP 请求", isUser: false },
      { id: 3, text: "具体怎么实现代码分割？", isUser: true },
      { id: 4, text: "这是一个有趣的话题。让我从几个角度来分析...\n\n代码分割的实现方法：\n\n1. 路由级别的分割\n2. 组件级别的分割\n3. 动态导入 (import())\n4. Webpack 的 splitChunks 配置", isUser: false }
    ]
  },
  {
    id: 5,
    title: "React vs Vue 对比",
    lastMessage: "这是一个有趣的话题。让我从几个角度来分析...",
    timestamp: "2024-01-15 10:30",
    messages: [
      { id: 1, text: "React 和 Vue 有什么区别？", isUser: true },
      { id: 2, text: "这是一个有趣的话题。让我从几个角度来分析...\n\nReact 和 Vue 的主要区别：\n\n1. 学习曲线：Vue 更易上手\n2. 生态系统：React 更丰富\n3. 性能：两者都很优秀\n4. 社区：React 更大", isUser: false },
      { id: 3, text: "选择哪个框架比较好？", isUser: true },
      { id: 4, text: "基于您的问题，我认为可以考虑以下几个方面...\n\n选择框架的建议：\n\n- 新手推荐 Vue\n- 大型项目考虑 React\n- 团队技术栈很重要\n- 项目需求决定选择", isUser: false }
    ]
  }
]);

const currentChatId = ref(null);

const adjustTextareaHeight = () => {
  const el = textarea.value;
  if (el) {
    el.style.height = 'auto';
    const maxHeight = 200;
    if (el.scrollHeight < maxHeight) {
        el.style.height = `${el.scrollHeight}px`;
    } else {
        el.style.height = `${maxHeight}px`;
    }
  }
};

watch(newMessage, () => {
    nextTick(adjustTextareaHeight);
});

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
};

const createNewChat = () => {
  // 清空当前消息
  messages.value = [];
  newMessage.value = '';
  currentChatId.value = null;
  
  // 重置输入框高度
  nextTick(adjustTextareaHeight);
};

const loadChat = (chatId) => {
  const chat = chatHistory.value.find(c => c.id === chatId);
  if (chat) {
    messages.value = [...chat.messages];
    currentChatId.value = chatId;
    newMessage.value = '';
    nextTick(() => {
      adjustTextareaHeight();
      scrollToBottom();
    });
  }
};

const sendMessage = () => {
    const trimmedMessage = newMessage.value.trim();
    if (trimmedMessage === '') return;

    // 如果是新聊天，创建新的聊天记录
    if (!currentChatId.value) {
      currentChatId.value = Date.now();
      chatHistory.value.unshift({
        id: currentChatId.value,
        title: trimmedMessage.length > 20 ? trimmedMessage.substring(0, 20) + '...' : trimmedMessage,
        lastMessage: '',
        timestamp: new Date().toLocaleString(),
        messages: []
      });
    }

    // 添加用户消息
    const userMessage = {
        id: Date.now(),
        text: trimmedMessage,
        isUser: true,
    };
    messages.value.push(userMessage);

    // 保存到聊天记录
    const chatIndex = chatHistory.value.findIndex(chat => chat.id === currentChatId.value);
    if (chatIndex !== -1) {
      chatHistory.value[chatIndex].messages.push(userMessage);
    }

    newMessage.value = '';
    nextTick(adjustTextareaHeight);
    scrollToBottom();

    // 模拟AI回复
    setTimeout(() => {
        const aiResponses = [
            "我理解您的问题。让我为您详细解答一下...",
            "这是一个很好的问题！根据我的分析...",
            "感谢您的提问。我可以为您提供以下建议...",
            "我明白您的需求。让我为您提供一些解决方案...",
            "这是一个有趣的话题。让我从几个角度来分析...",
            "基于您的问题，我认为可以考虑以下几个方面...",
            "我理解您的困惑。让我为您解释一下...",
            "这是一个常见的问题。我的建议是...",
            "感谢您的咨询。我可以为您提供专业的建议...",
            "我明白您的想法。让我为您详细说明..."
        ];
        
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        
        const aiMessage = {
            id: Date.now() + 1,
            text: randomResponse,
            isUser: false,
        };
        
        messages.value.push(aiMessage);
        
        // 更新聊天记录的最后一条消息
        if (currentChatId.value) {
          const chatIndex = chatHistory.value.findIndex(chat => chat.id === currentChatId.value);
          if (chatIndex !== -1) {
            chatHistory.value[chatIndex].lastMessage = randomResponse;
            chatHistory.value[chatIndex].timestamp = new Date().toLocaleString();
            chatHistory.value[chatIndex].messages.push(aiMessage);
          }
        }
        
        scrollToBottom();
    }, 1000 + Math.random() * 1000); // 1-2秒的随机延迟
}

const handleKeydown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}
.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

textarea {
    scrollbar-width: none;
}
textarea::-webkit-scrollbar {
    display: none;
}
</style>

