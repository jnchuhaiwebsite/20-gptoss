<template>
  <section id="showcase" class="py-20 bg-blue-pale">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-blue-dark sm:text-4xl">
          See What's Possible with Wan 2.2 Plus
        </h2>
        <p class="mt-4 text-xl text-blue-secondarytext">
          Explore a gallery of stunning short films, dynamic visuals, and creative shorts—all generated with the power of Wan 2.2.
        </p>
      </div>
      <div class="mt-16 flex flex-wrap justify-center gap-6">
        <div
          v-for="(item, itemIndex) in cases"
          :key="itemIndex"
          class="group flex w-[380px] flex-col overflow-hidden rounded-lg bg-blue-nav shadow-xl"
          @mouseenter="handleMouseEnter(itemIndex)"
          @mouseleave="handleMouseLeave(itemIndex)"
        >
          <div class="relative flex h-[285px] items-center justify-center bg-black">
            <div v-if="loadingIndex === itemIndex" class="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
              <div class="h-12 w-12 animate-spin rounded-full border-4 border-blue-dark border-t-transparent"></div>
            </div>
            <video
              :ref="el => { if (el) videoRefs[itemIndex] = el as HTMLVideoElement }"
              :src="item.video"
              :poster="item.poster"
              class="h-full w-full object-cover"
              :preload="item.poster ? 'none' : 'metadata'"
              loading="lazy"
              @loadstart="onLoadStart(itemIndex)"
              @canplay="onCanPlay(itemIndex)"
              @error="onVideoError(itemIndex)"
              @waiting="onVideoWaiting(itemIndex)"
              @playing="onVideoPlaying(itemIndex)"
              playsinline
              webkit-playsinline
              x5-playsinline
              x5-video-player-type="h5"
              x5-video-player-fullscreen="false"
              muted
              loop
            ></video>
            <div class="pointer-events-none absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div class="mb-2 flex justify-end">
                <button
                  @click.stop="copyDesc(itemIndex)"
                  class="pointer-events-auto rounded-full bg-black bg-opacity-25 p-2 transition-colors hover:bg-opacity-50 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <p class="text-sm text-white line-clamp-2">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-16 text-center">
      <div class="text-2xl text-blue-secondarytext mb-6">
        Ready to create your own stunning videos?
      </div>
      <button
        @click="scrollToTop"
        class="bg-blue-dark text-blue-buttontext hover:bg-blue-buttonhover font-semibold px-8 py-4 rounded-lg transition-colors focus:outline-none text-xl"
      >
        Start Creating Your Video
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useNotificationStore } from '~/stores/notification';
import { useNuxtApp } from 'nuxt/app'
const notificationStore = useNotificationStore();

const cases = [
  {
    video: "https://resp.wan2video.com/wan2ai/gallery/video/Moonlit-Ink-Wash-Kitten.mp4",
    poster: "https://resp.wan2video.com/wan2ai/gallery/image/Moonlit-Ink-Wash-Kitten.webp",
    desc: "A Chinese ink-style animation featuring a fluffy white kitten running through a moonlit courtyard. The kitten has round eyes, gently twitching ears, agile limbs, and a tail that sways naturally with its movement. The background is a traditional Chinese courtyard with stone paths flanked by low bamboo fences and blooming plum blossoms. In the distance, a hazy moon hangs in the night sky. The color palette is a soft blue-gray tone, creating a serene nighttime atmosphere. The camera follows the kitten from a low-angle perspective, emphasizing dynamic motion."
  },
  {
    video: "https://resp.wan2video.com/wan2ai/gallery/video/Whimsical-City-Dash.mp4",
    poster: "https://resp.wan2video.com/wan2ai/gallery/image/Whimsical-City-Dash.webp",
    desc: "The camera rapidly advances along the city's central road, revealing the details of the streets on both sides of the city and the passers-by. The atmosphere of the scene is full of childlike fun and fantasy."
  },
  {
    video: "https://resp.wan2video.com/wan2ai/gallery/video/The-Lamplight-Listener.mp4",
    poster: "https://resp.wan2video.com/wan2ai/gallery/image/The-Lamplight-Listener.webp",
    desc: "Edge lighting, medium-close shot, artificial lighting, side lighting, low saturation, warm tones, composition weighted to the right. The scene is filmed from an over-the-shoulder angle, focusing on a foreign girl wearing a blue-and-white plaid shirt. She has well-defined facial features and bright, focused eyes. A few strands of hair fall from her neat ponytail, adding a soft touch to her appearance. The girl slightly tilts her head, lips slightly parted, as if she's listening to someone speaking across from her. The background is a dimly lit, blurred room. A vintage desk lamp with a white lampshade provides a soft side light, illuminating the contours of her face. A black wooden door next to a cabinet is faintly visible, enhancing the scene's sense of mystery and depth."
  },
  {
    video: "https://resp.wan2video.com/wan2ai/gallery/video/Desk-Repose.mp4",
    poster: "https://resp.wan2video.com/wan2ai/gallery/image/Desk-Repose.webp",
    desc: "Hard lighting, side lighting, medium shot, low saturation, high contrast, mid focal length. A close-up of a foreign man is captured straight-on. He is wearing a striped shirt and sitting at a wooden desk with some folders and a red telephone on it. His arms are crossed over his chest, and his head rests against the wall as he relaxes. His eyes are closed, and his mouth is slightly open as if speaking. In the foreground, a blurred silhouette of a person is visible. The background features a dark wooden wall with a painting and other decorations hanging on it. The overall scene conveys a quiet, contemplative mood."
  },
  {
    video: "https://resp.wan2video.com/wan2ai/gallery/video/Morning-Gaze.mp4",
    poster: "https://resp.wan2video.com/wan2ai/gallery/image/Morning-Gaze.webp",
    desc: "Sunrise, daytime, soft light, side lighting, edge lighting, medium-close shot, centered composition, warm tones. A Caucasian woman sits on a white bed, wearing a blue-and-white checkered cotton shirt. Her hair is messy and voluminous, naturally wavy in golden brown. She looks slightly tired but gazes softly toward the camera, as if in conversation. Sunlight streams through light beige curtains, casting gentle light and shadow contours on the bed sheets and walls. A white wrought iron railing surrounds the window, enhancing the room's peaceful and cozy atmosphere. The camera focuses on the woman's upper body, with a blurred background that highlights the subtle interaction between her emotions and the environment."
  },
  {
    video: "https://resp.wan2video.com/wan2ai/gallery/video/My-Little-Max.mp4",
    poster: "https://resp.wan2video.com/wan2ai/gallery/image/My-Little-Max.webp",
    desc: "A straight-on close-up of a foreign man's face. He has blue eyes and a shaved head. His face is covered in sweat as he stares directly into the camera, then slowly lowers his head. At the bottom of the screen, white English subtitles appear: \"My little Max...\". The background is blurred and indistinct. The camera tilts upward, transitioning to an overhead close-up of the back of his head."
  },
  {
    video: "https://resp.wan2video.com/wan2ai/gallery/video/Jungle-Prowl.mp4",
    poster: "https://resp.wan2video.com/wan2ai/gallery/image/Jungle-Prowl.webp",
    desc: "A telephoto shot captures a tiger moving through the jungle. The camera follows the tiger with smooth motion as it remains centered in the frame. Its muscles shift subtly beneath its striped fur. The tiger's eyes are focused straight ahead, and its steps are steady and powerful. The background is filled with dense green foliage and trees, with sunlight filtering through the leaves to create dappled patterns of light and shadow."
  },
  {
    video: "https://resp.wan2video.com/wan2ai/gallery/video/Desert-Drive.mp4",
    poster: "https://resp.wan2video.com/wan2ai/gallery/image/Desert-Drive.webp",
    desc: "Warm tones, extreme wide shot, aerial view, daylight, hard lighting, establishing shot. In a barren desert, a black SUV speeds along a highway. Filmed from above, the vehicle drives on the left side of the road, with a roof rack and a red taillight visible on top. The camera slowly pushes forward, revealing vast yellow sand dunes ahead, with several mountains visible in the distance. The sky is pale blue, and sunlight filters through the clouds, casting a warm glow over the desolate landscape. On both sides of the road are dry grasslands dotted with low shrubs."
  },
  {
    video: "https://resp.wan2video.com/wan2ai/gallery/video/The-Aftermath.mp4",
    poster: "https://resp.wan2video.com/wan2ai/gallery/image/The-Aftermath.webp",
    desc: "Practical lighting, high saturation, balanced composition, nighttime, top lighting, soft light, warm tones, mid focal length, low contrast, medium shot, artificial lighting, three-person frame. In a dimly lit interior, the camera captures a straight-on medium shot of three foreign individuals. On the left, a woman in a black dress with gold embellishments holds a handgun. In the center, a man in a black tuxedo has blood on his face. On the right, a woman in a red dress with a large flower on her chest also has blood on her face. All three are looking in the same direction. In the background, a table lamp and some furniture are visible, but the details are unclear."
  }
];

const playingIndex = ref<number|null>(null);//当前播放的索引
const copiedIndex = ref<number|null>(null);//当前复制的索引
const loadingIndex = ref<number|null>(null);//当前加载的索引
const videoRefs = ref<HTMLVideoElement[]>([]);

const runAfterPostersLoaded = (callback: () => void) => {
  const posterUrls = cases
    .map(c => c.poster)
    .filter(Boolean) as string[];

  if (posterUrls.length === 0) {
    callback();
    return;
  }

  let loadedCount = 0;
  const totalPosters = posterUrls.length;

  posterUrls.forEach(url => {
    const img = new Image();
    img.src = url;
    const onFinish = () => {
      loadedCount++;
      if (loadedCount === totalPosters) {
        callback();
      }
    };
    img.onload = onFinish;
    img.onerror = onFinish; 
  });
};

function handleMouseEnter(idx: number) {
  const videoElement = videoRefs.value[idx];
  if (!videoElement) return;

  // 暂停其他正在播放的视频
  videoRefs.value.forEach((vid, i) => {
    if (i !== idx && vid && !vid.paused) {
      vid.pause();
    }
  });

  playingIndex.value = idx;
  // 检查视频是否已准备好，防止在已缓存的视频上显示不必要的加载动画
  // HAVE_FUTURE_DATA (3) 或 HAVE_ENOUGH_DATA (4) 意味着可以开始播放
  if (videoElement.readyState < 3) {
    loadingIndex.value = idx;
  }
  const playPromise = videoElement.play();
  if (playPromise !== undefined) {
    playPromise.catch(e => {
      console.error('Video playback failed:', e);
      if (playingIndex.value === idx) playingIndex.value = null;
      if (loadingIndex.value === idx) loadingIndex.value = null;
    });
  }
}

function handleMouseLeave(idx: number) {
  const videoElement = videoRefs.value[idx];
  if (videoElement) {
    videoElement.pause();
    videoElement.currentTime = 0; // 重置视频到开头
    if (playingIndex.value === idx) {
      playingIndex.value = null;
    }
    if (loadingIndex.value === idx) {
      loadingIndex.value = null;
    }
  }
}

// 视频开始加载
function onLoadStart(idx: number) {
  if (playingIndex.value === idx) {
    loadingIndex.value = idx;
  }
}

// 视频可以播放
function onCanPlay(idx: number) {
  if (playingIndex.value === idx) {
    loadingIndex.value = null;
  }
}

// 视频等待缓冲
function onVideoWaiting(idx: number) {
  if (playingIndex.value === idx) {
    loadingIndex.value = idx;
  }
}

// 视频开始播放
function onVideoPlaying(idx: number) {
  if (playingIndex.value === idx) {
    loadingIndex.value = null;
  }
}

// 视频加载错误
function onVideoError(idx: number) {
  loadingIndex.value = null;
  playingIndex.value = null;
  console.error(`Video loading error for index ${idx}`);
}

// 组件卸载时清理
onMounted(() => {
});

onUnmounted(() => {
  // 暂停所有视频
  videoRefs.value.forEach(video => {
    if (video) {
      video.pause();
      video.src = '';
      video.load();
    }
  });
  playingIndex.value = null;
  loadingIndex.value = null;
});
const { $toast } = useNuxtApp() as any
function copyDesc(idx: number) {
  navigator.clipboard.writeText(cases[idx].desc);
  copiedIndex.value = idx;
  $toast.success('Prompt Copied to clipboard');
  // notificationStore.addNotification({
  //   taskId: `copy-success-${Date.now()}`,
  //   status: 'success',
  //   message: 'copied to clipboard'
  // });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
</script>

<style scoped>
.break-inside-avoid {
  break-inside: avoid;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style> 