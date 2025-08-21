<template>
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans" style="height: 100vh;">
    <div class="absolute top-4 right-4 z-50">
      <UserMenu />
    </div>
    <div class="h-full flex relative overflow-hidden">
      
      <!-- Sidebar -->
      <aside 
        :class="[
          'bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-72 flex flex-col transition-transform duration-300 z-40 overflow-hidden',
          'fixed h-full',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <div class="p-4 flex-grow flex flex-col h-full overflow-hidden">
          <div class="flex items-center justify-between mb-4">
            <NuxtLink to="/" class="text-lg font-semibold hover:opacity-80 transition-opacity"><h1>GPT-Oss Chat</h1></NuxtLink>
            <button @click="isSidebarOpen = false" class="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" title="Collapse Sidebar">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <button @click="createNewChat" class="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center justify-center mb-6">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            New Chat
          </button>
          
          <div class="flex-grow overflow-y-auto">
            <div class="space-y-2">
              <h3 class="text-sm font-semibold text-gray-500 mb-3">Recent Chats</h3>
              <div v-if="chatHistoryLoading" class="flex items-center justify-center py-4">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
                <span class="ml-2 text-sm text-gray-500">Loading...</span>
              </div>
              <div v-else-if="chatHistory.length === 0" class="text-center py-8">
                <div class="text-gray-400 mb-2">
                  <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                </div>
                <p class="text-sm text-gray-500">No chat history</p>
                <p class="text-xs text-gray-400 mt-1">Start a new conversation</p>
              </div>
              <div v-else>
                <div v-for="chat in chatHistory" :key="chat.id" 
                     @click="loadChat(chat.id)"
                     class="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                     :class="{ 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700': currentChatId === chat.id }">
                  <div class="flex items-start justify-between">
                    <div class="flex-1 min-w-0">
                      <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{{ chat.title }}</h4>
                      <p class="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">{{ chat.lastMessage || '' }}</p>
                    </div>
                    <span class="text-xs text-gray-400 ml-2">{{ chat.timestamp }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main class="flex-1 flex flex-col">
        <header class="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-4">
            <button v-if="!isSidebarOpen" @click="isSidebarOpen = true" class="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" title="Expand Sidebar">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </header>

        <section class="flex-1 flex flex-col overflow-y-hidden h-full">
          <div v-if="messages.length === 0" class="flex-1 flex flex-col justify-center items-center text-center p-4 md:p-6">
            <img src="/favicon.ico" alt="Gpt Oss Logo" class="w-16 h-16 mb-4 rounded-full shadow-md" />
            <h2 class="text-4xl font-bold mb-8">Hi, I'm Gpt Oss</h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-2">What can I help you with?</p>
            <div class="mt-10 w-full max-w-3xl">
              <div class="relative bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl flex items-center p-2">
                <textarea
                  v-model="newMessage"
                  @keydown="handleKeydown"
                  @focus="checkAuthOnFocus"
                  placeholder="Ask anything"
                  class="w-full bg-transparent focus:outline-none resize-none mx-2"
                  rows="1"
                  ref="textarea"
                ></textarea>
                <button @click="sendMessage" class="p-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-full hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none disabled:bg-gray-200 dark:disabled:bg-gray-700" :disabled="!newMessage.trim()">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>
                </button>
              </div>
            </div>
          </div>
          
          <div v-else ref="messageContainer" class="flex-1 overflow-y-auto pb-4 p-4 md:p-6 scroll-smooth bg-gray-50 dark:bg-gray-800">
            <div class="max-w-3xl mx-auto w-full space-y-6">
              <div v-for="(message, index) in messages" :key="message.id" class="flex" :class="message.isUser ? 'justify-end' : 'justify-start'">
                <div class="flex items-start gap-4" :class="message.isUser ? 'flex-row-reverse' : 'flex-row'">
                  <div v-if="message.isUser" class="flex-shrink-0">
                    <img :src="userAvatar" alt="User Avatar" class="w-8 h-8 rounded-full object-cover">
                  </div>
                  <img v-else src="/favicon.ico" alt="Bot" class="w-8 h-8 rounded-full shadow-md flex-shrink-0">
                  
                  <div v-if="message.isUser" class="rounded-xl p-4 text-base bg-blue-500 text-white min-w-0 max-w-xl lg:max-w-2xl">
                    <div class="markdown-body">
                      <p style="white-space: pre-wrap;">{{ message.text }}</p>
                    </div>
                  </div>

                  <!-- 这里给气泡也加上 min-w-0，避免被子元素撑出容器 -->
                  <div v-else class="flex flex-col items-start max-w-xl lg:max-w-2xl min-w-0">
                    <div class="rounded-xl p-4 text-base bg-white dark:bg-gray-700 shadow-sm min-w-0" style="max-width: 100%;">
                      <!-- Streaming plain text -->
                      <div v-if="message.isStreaming" class="markdown-body">
                          <p style="white-space: pre-wrap;">{{ message.accumulatedText }}<span class="typing-cursor">|</span></p>
                      </div>
                      <!-- Rendered HTML -->
                      <div v-else class="markdown-body" v-html="message.renderedHtml" style="min-width: 0;"></div>
                    </div>
                    <!-- Toolbar for AI messages -->
                    <div v-if="!message.isStreaming && message.text" class="mt-2 transition-opacity duration-300 flex items-center gap-2">
                      <button @click="copyToClipboard(message.text)" class="p-1.5 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none" title="Copy">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                      </button>
                      <button @click="downloadAsMd(message.text, messages[index - 1] ? messages[index - 1].text : 'chat-response')" class="p-1.5 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none" title="Download as MD">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="messages.length > 0" class="p-4 md:p-6 pt-2 flex-shrink-0">
            <div class="max-w-3xl mx-auto w-full">
              <div class="relative bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl flex items-center p-2">
                <textarea
                  v-model="newMessage"
                  @keydown="handleKeydown"
                  @focus="checkAuthOnFocus"
                  placeholder="Ask anything"
                  class="w-full bg-transparent focus:outline-none resize-none mx-2"
                  rows="1"
                  ref="textarea"
                ></textarea>
                <button @click="sendMessage" class="p-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-full hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none disabled:bg-gray-200 dark:disabled:bg-gray-700" :disabled="!newMessage.trim()">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useNuxtApp } from 'nuxt/app'
import { ref, nextTick, watch, onMounted, computed, onUnmounted } from 'vue';
import { useUserStore } from '~/stores/user';
import { getChatUuid, chat, getChatList, getChatDetails } from '~/api';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import UserMenu from '~/components/UserMenu.vue';
import { useUiStore } from '~/stores/ui';
import { useClerkAuth } from '~/utils/authHelper';

// Sidebar state
const isSidebarOpen = ref(true);

// Detect mobile view
const screenWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024);
const isMobileView = computed(() => screenWidth.value < 1024);

const updateScreenWidth = () => {
  if (typeof window !== 'undefined') {
    screenWidth.value = window.innerWidth;
  }
};

const { $toast } = useNuxtApp()
const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

// Add a wrapper to tables to make them scrollable
md.renderer.rules.table_open = function () {
  return '<div class="table-wrapper"><table class="table">';
};
md.renderer.rules.table_close = function () {
  return '</table></div>';
};

const copyToClipboard = async (text) => {
  try {
    const plainText = text.replace(/<[^>]*>?/gm, '');
    await navigator.clipboard.writeText(plainText);
    $toast.success('Copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy text: ', err);
    $toast.error('Failed to copy.')
  }
};

const downloadAsMd = (answer, question) => {
  try {
    const blob = new Blob([answer], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = question.replace(/[\\/:*?"<>|]/g, '').substring(0, 50).trim() || 'response';
    link.download = `${fileName}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    $toast.success('Downloaded successfully!')
  } catch (err) {
    console.error('Failed to download markdown: ', err);
    $toast.error('Failed to download.')
  }
};

const uiStore = useUiStore();
const { isSignedIn } = useClerkAuth();

const checkAuthOnFocus = () => {
  if (!isSignedIn.value) {
    uiStore.showLoginPrompt();
    if (textarea.value) {
      textarea.value.blur();
    }
  }
};

const userStore = useUserStore();

const hasAuthToken = () => {
  return document.cookie.split(';').some((item) => item.trim().startsWith('auth_token='));
};

const fetchHistoryWithTokenCheck = (retries = 5) => {
  if (hasAuthToken()) {
    fetchChatHistory();
  } else if (retries > 0) {
    setTimeout(() => fetchHistoryWithTokenCheck(retries - 1), 1000);
  }
};

const getUserAvatar = () => {
  if (typeof window === 'undefined') return null;
  const cookies = document.cookie.split(';');
  const avatarCookie = cookies.find(cookie => cookie.trim().startsWith('user_avatar='));
  if (avatarCookie) {
    try {
      const avatarData = JSON.parse(decodeURIComponent(avatarCookie.split('=')[1]));
      const expireTime = avatarData.expireTime;
      if (expireTime && Date.now() < expireTime) {
        return avatarData.avatarUrl;
      } else {
        document.cookie = 'user_avatar=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    } catch (error) {
      document.cookie = 'user_avatar=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }
  return null;
};

const setUserAvatar = (avatarUrl) => {
  if (!avatarUrl || typeof window === 'undefined') return;
  const expireTime = Date.now() + (60 * 60 * 1000);
  const avatarData = { avatarUrl, expireTime };
  document.cookie = `user_avatar=${encodeURIComponent(JSON.stringify(avatarData))}; max-age=3600; path=/;`;
};

const userAvatar = computed(() => {
  const cachedAvatar = getUserAvatar();
  if (cachedAvatar) return cachedAvatar;
  if (userStore.userInfo?.avatar) {
    const avatarUrl = userStore.userInfo.avatar+"?width=64&height=64";
    setUserAvatar(avatarUrl);
    return avatarUrl;
  }
  return '/default-avatar.png';
});

const messages = ref([]);
const messageContainer = ref(null);
const newMessage = ref('');
const textarea = ref(null);

onMounted(async () => {
  try {
    await userStore.fetchUserInfo();
  } catch (error) {}

  currentGroupId.value = `group_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

  updateScreenWidth();
  if (isMobileView.value) {
    isSidebarOpen.value = false;
  }
  window.addEventListener('resize', updateScreenWidth);

  nextTick(() => {
    if (messages.value.length > 0) {
      scrollToBottom();
    }
  });
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateScreenWidth);
  }
});

const chatHistory = ref([]);
const chatHistoryLoading = ref(false);
const currentChatId = ref(null);
const currentGroupId = ref(null);

const fetchChatHistory = async () => {
  try {
    chatHistoryLoading.value = true;
    const response = await getChatList();
    if (response && response.code === 200 && response.data) {
      chatHistory.value = response.data.map((chat, index) => ({
        id: chat.task_id,
        title: chat.question || `Chat ${index + 1}`,
        lastMessage: chat.msg || '',
        timestamp: formatTimestamp(chat.task_id),
        taskId: chat.task_id,
        messages: []
      }));
    } else {
      chatHistory.value = [];
    }
  } catch (error) {
    chatHistory.value = [];
  } finally {
    chatHistoryLoading.value = false;
  }
};

const formatTimestamp = (taskId) => {
  try {
    const timestamp = taskId.split('_')[1];
    if (timestamp) {
      const date = new Date(parseInt(timestamp));
      return date.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    }
  } catch (error) {}
  return '刚刚';
};

const adjustTextareaHeight = () => {
  const el = textarea.value;
  if (el) {
    el.style.height = 'auto';
    const maxHeight = 200;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }
};

watch(newMessage, () => nextTick(adjustTextareaHeight));

watch(isSignedIn, (newValue) => {
  if (newValue) fetchHistoryWithTokenCheck();
}, { immediate: true });

watch(messages, () => {
  nextTick(() => {
    if (messages.value.length > 0) forceScrollToBottom();
  });
}, { deep: true });

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTo({
        top: messageContainer.value.scrollHeight,
        behavior: 'smooth'
      });
    }
  });
};

const forceScrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

let scrollTimeout = null;
const debouncedScrollToBottom = () => {
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => forceScrollToBottom(), 100);
};

const createNewChat = () => {
  messages.value = [];
  newMessage.value = '';
  currentChatId.value = null;
  currentGroupId.value = `group_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  nextTick(adjustTextareaHeight);
  if (isMobileView.value) isSidebarOpen.value = false;
  fetchChatHistory();
};

const loadChat = async (chatId) => {
  const chat = chatHistory.value.find(c => c.id === chatId);
  if (!chat) return;

  currentChatId.value = chatId;
  currentGroupId.value = chat.taskId || chatId;
  
  if (chat.messages.length === 0) {
    try {
      messages.value = [];
      const response = await getChatDetails(currentGroupId.value);
      if (response && response.code === 200 && Array.isArray(response.data)) {
        const allMessages = response.data.flatMap((qaPair, index) => {
          const userMessage = {
            id: `${chat.id}_q_${index}`,
            text: qaPair.question,
            isUser: true,
          };
          const aiMessage = {
            id: `${chat.id}_a_${index}`,
            text: qaPair.msg,
            isUser: false,
            isStreaming: false,
            accumulatedText: qaPair.msg,
            renderedHtml: md.render(qaPair.msg),
          };
          return [userMessage, aiMessage];
        });
        messages.value = allMessages;
        chat.messages = allMessages;
      } else {
        messages.value = [{ id: Date.now(), text: '无法加载聊天记录，请稍后重试。', isUser: false }];
      }
    } catch (error) {
      messages.value = [{ id: Date.now(), text: '加载聊天记录时出错。', isUser: false }];
    }
  } else {
    messages.value = [...chat.messages];
  }
  
  newMessage.value = '';
  if (isMobileView.value) isSidebarOpen.value = false;
  nextTick(() => {
    adjustTextareaHeight();
    scrollToBottom();
  });
};

const sendMessage = async () => {
  const trimmedMessage = newMessage.value.trim();
  if (!trimmedMessage) return;

  if (!currentChatId.value) {
    const newChatId = currentGroupId.value;
    currentChatId.value = newChatId;
    const newChat = {
      id: newChatId,
      title: trimmedMessage.substring(0, 20),
      lastMessage: '',
      timestamp: formatTimestamp(newChatId),
      taskId: newChatId,
      messages: []
    };
    chatHistory.value.unshift(newChat);
  }

  const userMessage = { id: Date.now(), text: trimmedMessage, isUser: true };
  messages.value.push(userMessage);

  const chatIndex = chatHistory.value.findIndex(chat => chat.id === currentChatId.value);
  if (chatIndex !== -1) chatHistory.value[chatIndex].messages.push(userMessage);

  newMessage.value = '';
  nextTick(adjustTextareaHeight);
  scrollToBottom();

  try {
    const uuidResponse = await getChatUuid();
    if (!uuidResponse?.data?.task_id) throw new Error('未获取到有效的task_id');
    const taskId = uuidResponse.data.task_id;

    const chatId = `chat_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    const groupId = currentGroupId.value;

    const wsBaseUrl = process.env.NODE_ENV === 'development' ? 'wss://art.gptoss2.com' : 'wss://art.gptoss2.com';
    const wsUrl = `${wsBaseUrl}/api/talk/gptoss/chat?task_id=${taskId}`;
    const ws = new WebSocket(wsUrl);

    let aiMessageId = Date.now() + 1;
    
    const aiMessage = {
      id: aiMessageId,
      text: '',
      isUser: false,
      isStreaming: true,
      accumulatedText: 'Thinking...',
      renderedHtml: ''
    };
    messages.value.push(aiMessage);
    if (chatIndex !== -1) chatHistory.value[chatIndex].messages.push(aiMessage);

    ws.onopen = () => {
      const chatRequest = { input: trimmedMessage, uuid: chatId, group_id: groupId };
      ws.send(JSON.stringify(chatRequest));
    };

    ws.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);

        if (aiMessage.accumulatedText === 'Thinking...') {
          aiMessage.accumulatedText = '';
        }
        if (response.msg) {
          aiMessage.accumulatedText += response.msg;
        }
        if (response.stop === 1) {
          aiMessage.isStreaming = false;
          aiMessage.text = aiMessage.accumulatedText;
          aiMessage.renderedHtml = md.render(aiMessage.accumulatedText);
          
          const chat = chatHistory.value.find(c => c.id === currentChatId.value);
          if (chat) {
            chat.lastMessage = aiMessage.accumulatedText.substring(0, 30) + (aiMessage.accumulatedText.length > 30 ? '...' : '');
            chat.timestamp = formatTimestamp(`group_${Date.now()}`);
          }
          
          nextTick(debouncedScrollToBottom);
          ws.close();
        }
      } catch (error) {
        aiMessage.isStreaming = false;
        aiMessage.accumulatedText = 'Error processing message.';
        aiMessage.renderedHtml = '<p>Error processing message.</p>';
      }
    };

    ws.onerror = () => {
      aiMessage.text = '抱歉，连接出现问题，请重试。';
    };

  } catch (error) {
    messages.value.pop();
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
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
.dark ::-webkit-scrollbar-thumb { background: #4b5563; }
textarea { scrollbar-width: none; }
textarea::-webkit-scrollbar { display: none; }

/* 默认：PC 横向滚动 */
.markdown-body pre { 
  background-color: #2d2d2d; 
  color: #f8f8f2; 
  padding: 1em; 
  border-radius: 8px; 
  overflow-x: auto;          /* 横向滚动 */
  overflow-y: hidden;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  white-space: pre;          /* 保持原始格式 */
  font-family: 'Courier New', Courier, monospace;
  -webkit-overflow-scrolling: touch; /* 移动端滚动更流畅 */
}

/* 美化滚动条（横向时更窄） */
.markdown-body pre::-webkit-scrollbar {
  height: 6px;
}
.markdown-body pre::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 4px;
}
.dark .markdown-body pre::-webkit-scrollbar-thumb {
  background: #999;
}

/* 移动端优化：小屏幕改为自动换行，避免横向滚动条难看 */
@media (max-width: 768px) {
  .markdown-body pre {
    font-size: 0.85rem;          /* 缩小字体 */
    padding: 0.75em;             /* 缩小 padding */
    white-space: pre-wrap;       /* 自动换行 */
    word-break: break-word;      /* 允许断行 */
    overflow-x: hidden;          /* 禁用横向滚动 */
  }
}


/* ⚠️ 已移除 .rounded-xl { overflow: hidden; }，避免裁掉代码块滚动条 */
</style>
