<template>
  <div class="mt-[80px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans" style="height: calc(100vh - 80px);">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex">
      
      <!-- Sidebar -->
      <aside class="flex-shrink-0 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-72 flex flex-col">
        <div class="p-4 flex-grow flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold">GPT-Oss Chat</h2>
            <button @click="fetchChatHistory" class="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" title="Refresh Chat History">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
          </div>
          <button @click="createNewChat" class="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center justify-center mb-6">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            New Chat
          </button>
          

          <div class="flex-grow overflow-y-auto">
            <!-- Recent chats -->
            <div class="space-y-2">
              <h3 class="text-sm font-semibold text-gray-500 mb-3">Recent Chats</h3>
              
              <!-- 加载状态 -->
              <div v-if="chatHistoryLoading" class="flex items-center justify-center py-4">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
                <span class="ml-2 text-sm text-gray-500">Loading...</span>
              </div>
              
              <!-- 空状态 -->
              <div v-else-if="chatHistory.length === 0" class="text-center py-8">
                <div class="text-gray-400 mb-2">
                  <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                </div>
                <p class="text-sm text-gray-500">No chat history</p>
                <p class="text-xs text-gray-400 mt-1">Start a new conversation</p>
              </div>
              
              <!-- 聊天记录列表 -->
              <div v-else>
                <div v-for="chat in chatHistory" :key="chat.id" 
                     @click="loadChat(chat.id)"
                     class="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                     :class="{ 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700': currentChatId === chat.id }">
                  <div class="flex items-start justify-between">
                    <div class="flex-1 min-w-0">
                      <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{{ chat.title }}</h4>
                      <p class="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">{{ chat.lastMessage || 'No reply' }}</p>
                    </div>
                    <span class="text-xs text-gray-400 ml-2">{{ chat.timestamp }}</span>
                  </div>
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
            <h1 class="text-4xl font-bold mb-8">What can I help you with?</h1>
            <!-- Centered Input for new chat -->
            <div class="w-full max-w-2xl">
              <div class="relative bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl flex items-center p-2">
                <button class="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-white">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                </button>
                <textarea
                  v-model="newMessage"
                  @keydown="handleKeydown"
                  placeholder="Ask anything"
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
          <div v-else ref="messageContainer" class="flex-1 space-y-6 overflow-y-auto pb-4 p-4 md:p-6 scroll-smooth">
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
                  <p style="white-space: pre-wrap;">{{ message.text }}<span v-if="!message.isUser && message.isTyping" class="typing-cursor">|</span></p>
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
                placeholder="Ask anything"
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
import { getChatUuid, chat, getChatList } from '~/api';

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

// WebSocket状态管理
const wsStatus = ref('idle'); // idle, connecting, connected, disconnected
const wsStatusText = computed(() => {
  const statusMap = {
    'idle': '未连接',
    'connecting': '连接中...',
    'connected': '已连接',
    'disconnected': '已断开'
  };
  return statusMap[wsStatus.value];
});

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
  
  // 获取聊天记录列表
  await fetchChatHistory();
  
  // 生成初始的group_id
  currentGroupId.value = `group_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  console.log('页面初始化，生成初始group_id:', currentGroupId.value);
  
  document.addEventListener('click', (e) => {
    const modelSelector = document.querySelector('.modelSelector');
    if (modelSelector && !modelSelector.contains(e.target)) {
      closeModelSelector();
    }
  });
  
  // 页面加载完成后，如果有消息则滚动到底部
  nextTick(() => {
    if (messages.value.length > 0) {
      scrollToBottom();
    }
  });
});

// 聊天记录列表
const chatHistory = ref([]);
const chatHistoryLoading = ref(false);

const currentChatId = ref(null);
const currentGroupId = ref(null); // 当前会话的group_id

// 获取聊天记录列表
const fetchChatHistory = async () => {
  try {
    chatHistoryLoading.value = true;
    const response = await getChatList();
    
    if (response && response.code === 200 && response.data) {
      // 转换API数据格式为本地格式
      chatHistory.value = response.data.map((chat, index) => ({
        id: chat.task_id,
        title: chat.question || `聊天 ${index + 1}`,
        lastMessage: chat.msg || '暂无回复',
        timestamp: formatTimestamp(chat.task_id), // 从task_id提取时间
        taskId: chat.task_id,
        messages: [] // 暂时为空，需要时再加载具体消息
      }));
    } else {
      console.error('获取聊天记录失败:', response);
      chatHistory.value = [];
    }
  } catch (error) {
    console.error('获取聊天记录失败:', error);
      chatHistory.value = [];
  } finally {
    chatHistoryLoading.value = false;
  }
};

// 格式化时间戳
const formatTimestamp = (taskId) => {
  try {
    // 从task_id中提取时间戳 (group_1755051318846_f27y4c5wq6d)
    const timestamp = taskId.split('_')[1];
    if (timestamp) {
      const date = new Date(parseInt(timestamp));
      return date.toLocaleString('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  } catch (error) {
    console.error('解析时间戳失败:', error);
  }
  return '刚刚';
};

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

// 监听消息列表变化，自动滚动到底部
watch(messages, () => {
    nextTick(() => {
        if (messages.value.length > 0) {
            forceScrollToBottom();
        }
    });
}, { deep: true });

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      // 使用平滑滚动效果
      messageContainer.value.scrollTo({
        top: messageContainer.value.scrollHeight,
        behavior: 'smooth'
      });
    }
  });
};

// 强制滚动到底部（用于流式回复时）
const forceScrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

// 防抖滚动函数，避免过于频繁的滚动
let scrollTimeout = null;
const debouncedScrollToBottom = () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(() => {
    forceScrollToBottom();
  }, 100);
};

// 打字机效果函数，让流式输出更自然
const typewriterEffect = (element, text, speed = 10) => {
  if (!element) return;
  
  let index = 0;
  const timer = setInterval(() => {
    if (index < text.length) {
      element.textContent = text.substring(0, index + 1);
      index++;
    } else {
      clearInterval(timer);
    }
  }, speed);
  
  return timer;
};

const createNewChat = () => {
  // 清空当前消息
  messages.value = [];
  newMessage.value = '';
  currentChatId.value = null;
  
  // 生成新的group_id
  currentGroupId.value = `group_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  console.log('创建新聊天，生成新的group_id:', currentGroupId.value);
  
  // 重置输入框高度
  nextTick(adjustTextareaHeight);
  
  // 刷新聊天记录列表
  fetchChatHistory();
};

const loadChat = async (chatId) => {

  const chat = chatHistory.value.find(c => c.id === chatId);
  if (chat) {
    // 设置当前聊天ID和group_id
    currentChatId.value = chatId;
    currentGroupId.value = chat.taskId || chatId; // 使用聊天的taskId作为group_id
    console.log('加载聊天，设置group_id:', currentGroupId.value);
    
    // 如果聊天记录为空，尝试从API加载
    if (chat.messages.length === 0) {
      try {
        // 这里可以调用API加载具体的聊天消息
        // 暂时显示基本信息
        messages.value = [
          { 
            id: Date.now(), 
            text: chat.title, 
            isUser: true 
          },
          { 
            id: Date.now() + 1, 
            text: chat.lastMessage || '暂无回复', 
            isUser: false 
          }
        ];
      } catch (error) {
        console.error('加载聊天记录失败:', error);
        messages.value = [
          { 
            id: Date.now(), 
            text: chat.title, 
            isUser: true 
          }
        ];
      }
    } else {
      messages.value = [...chat.messages];
    }
    
    newMessage.value = '';
    nextTick(() => {
      adjustTextareaHeight();
      scrollToBottom();
    });
  }
};

const sendMessage = async () => {
    const trimmedMessage = newMessage.value.trim();
    if (trimmedMessage === '') return;

    // 如果是新聊天，创建新的聊天记录
    if (!currentChatId.value) {
      // 使用已生成的group_id创建新聊天
      const newChatId = currentGroupId.value;
      currentChatId.value = newChatId;
      
      console.log('创建新聊天记录，使用group_id:', newChatId);
      
      // 添加到聊天记录列表
      const newChat = {
        id: newChatId,
        title: trimmedMessage.length > 20 ? trimmedMessage.substring(0, 20) + '...' : trimmedMessage,
        lastMessage: '',
        timestamp: formatTimestamp(newChatId),
        taskId: newChatId,
        messages: []
      };
      
      chatHistory.value.unshift(newChat);
    } else {
      console.log('继续现有聊天，group_id:', currentGroupId.value);
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

    try {
        console.log('开始发送消息，准备获取task_id...');
        
        // 1. 请求 getChatUuid API 获取 task_id
        const uuidResponse = await getChatUuid();
        console.log('getChatUuid响应:', uuidResponse);
        
        if (!uuidResponse || !uuidResponse.data || !uuidResponse.data.task_id) {
            throw new Error('未获取到有效的task_id');
        }

        const taskId = uuidResponse.data.task_id;
        console.log('获取到task_id:', taskId);

        // 2. 生成chat_id（每次消息都生成新的）
        const chatId = `chat_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        console.log('生成新的chat_id:', chatId);
        
        // 使用已生成的group_id
        const groupId = currentGroupId.value;
        console.log('使用当前会话的group_id:', groupId);

        // 3. 通过 WebSocket 请求 chat API
        console.log('当前环境:', process.env.NODE_ENV);
        const wsBaseUrl = process.env.NODE_ENV === 'development' ? 'ws://192.168.0.55:8686' : 'wss://art.gptoss2.com';
        console.log('WebSocket基础URL:', wsBaseUrl);
        
        const wsUrl = `${wsBaseUrl}/api/talk/gptoss/chat?task_id=${taskId}`;
        console.log('准备连接WebSocket，完整URL:', wsUrl);
        
                const ws = new WebSocket(wsUrl);
        console.log('WebSocket对象创建成功，状态:', ws.readyState);
        
        // 更新WebSocket状态为连接中
        wsStatus.value = 'connecting';
        
        ws.onopen = () => {
            console.log('WebSocket 连接已建立，准备发送数据...');
            wsStatus.value = 'connected';
            
            // 发送聊天请求数据
            const chatRequest = {
                input: trimmedMessage,
                uuid: chatId,
                group_id: groupId
            };
            
            console.log('发送聊天请求数据:', chatRequest);
            ws.send(JSON.stringify(chatRequest));
            console.log('聊天请求数据已发送');
        };

        // 用于累积AI回复的变量
        let accumulatedMessage = '';
        let aiMessageId = Date.now() + 1;
        
        // 先添加一个空的AI消息占位，显示加载状态
        const aiMessage = {
            id: aiMessageId,
            text: '正在思考中...',
            isUser: false,
        };
        messages.value.push(aiMessage);
        
        // 更新聊天记录
        if (currentChatId.value) {
            const chatIndex = chatHistory.value.findIndex(chat => chat.id === currentChatId.value);
            if (chatIndex !== -1) {
                chatHistory.value[chatIndex].messages.push(aiMessage);
            }
        }
        
        ws.onmessage = (event) => {
            try {
                const response = JSON.parse(event.data);
                console.log('收到WebSocket消息:', response);
                console.log('消息类型检查 - msg:', response.msg, 'stop:', response.stop, 'msgId:', response.msgId);
                
                // 处理流式消息片段
                if (response.msg && response.msg.trim() !== '') {
                    // 移除"正在思考中..."的占位文本
                    if (aiMessage.text === '正在思考中...') {
                        aiMessage.text = '';
                        accumulatedMessage = '';
                    }
                    
                    // 累积AI回复的消息片段
                    accumulatedMessage += response.msg;
                    
                    // 实时更新AI消息内容，实现流式输出效果
                    aiMessage.text = accumulatedMessage;
                    
                    // 添加光标闪烁效果，模拟正在输入
                    if (!aiMessage.isTyping) {
                        aiMessage.isTyping = true;
                    }
                    
                    // 更新聊天记录的最后一条消息
                    if (currentChatId.value) {
                        const chatIndex = chatHistory.value.findIndex(chat => chat.id === currentChatId.value);
                        if (chatIndex !== -1) {
                            chatHistory.value[chatIndex].lastMessage = accumulatedMessage;
                            chatHistory.value[chatIndex].timestamp = new Date().toLocaleString();
                        }
                    }
                    
                    // 流式输出时实时滚动到底部
                    nextTick(() => {
                        debouncedScrollToBottom();
                    });
                }
                
                // 检查是否停止生成（stop字段为1表示停止）
                if (response.stop === 1) {
                    console.log('AI回复生成完成，stop=1，准备关闭连接');
                    
                    // 清除超时定时器
                    clearTimeoutOnStop();
                    
                    // 标记AI消息已完成输入
                    aiMessage.isTyping = false;
                    
                    // 最终更新聊天记录
                    if (currentChatId.value) {
                        const chatIndex = chatHistory.value.findIndex(chat => chat.id === currentChatId.value);
                        if (chatIndex !== -1) {
                            chatHistory.value[chatIndex].lastMessage = accumulatedMessage;
                            chatHistory.value[chatIndex].timestamp = new Date().toLocaleString();
                        }
                    }
                    
                    // 回复完成后再次滚动到底部，确保完整显示
                    nextTick(() => {
                        forceScrollToBottom();
                    });
                    
                    // 只有当stop=1时才关闭WebSocket连接
                    console.log('关闭WebSocket连接');
                    ws.close();
                } else {
                    console.log('继续接收消息，stop=', response.stop);
                }
            } catch (error) {
                console.error('解析WebSocket消息失败:', error);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket 错误:', error);
            // WebSocket失败时显示错误信息
            aiMessage.text = '抱歉，连接出现问题，请重试。';
            aiMessage.isTyping = false;
            // 关闭连接
            ws.close();
        };

        ws.onclose = (event) => {
            console.log('WebSocket 连接已关闭，代码:', event.code, '原因:', event.reason);
            wsStatus.value = 'disconnected';
        };
        
        // 监听WebSocket状态变化
        ws.addEventListener('open', () => {
            console.log('WebSocket状态: 已连接');
            wsStatus.value = 'connected';
        });
        
        ws.addEventListener('connecting', () => {
            console.log('WebSocket状态: 连接中...');
            wsStatus.value = 'connecting';
        });
        
        ws.addEventListener('close', () => {
            console.log('WebSocket状态: 已关闭');
            wsStatus.value = 'disconnected';
        });
        
        ws.addEventListener('error', (error) => {
            console.log('WebSocket状态: 发生错误', error);
            wsStatus.value = 'disconnected';
        });

        // 设置超时，如果WebSocket在30秒内没有收到stop=1，显示超时信息
        let timeoutId = setTimeout(() => {
            if (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN) {
                console.log('WebSocket超时，未收到stop=1信号');
                aiMessage.text = '抱歉，响应超时，请重试。';
                aiMessage.isTyping = false;
                ws.close();
            }
        }, 30000); // 增加到30秒，给AI更多回复时间
        
        // 在收到stop=1时清除超时定时器
        const clearTimeoutOnStop = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        };

    } catch (error) {
        console.error('发送消息失败:', error);
        // API请求失败时，移除空的AI消息占位符
        if (messages.value.length > 0 && !messages.value[messages.value.length - 1].isUser) {
            messages.value.pop();
        }
    }
};



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

/* 打字机光标样式 */
.typing-cursor {
    animation: blink 1s infinite;
    color: #3b82f6;
    font-weight: bold;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}
</style>

