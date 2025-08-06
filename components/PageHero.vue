<template>
  <div class="mt-[80px] mb-10 flex flex-col items-center relative z-10">
    <h1 class="text-3xl sm:text-3xl lg:text-28rem font-bold bg-gradient-to-r from-blue-h1start to-blue-h1end bg-clip-text text-transparent py-4 leading-relaxed text-center max-w-[100%] mx-auto">
      {{ title }}
    </h1>
    <p class="mt-4 text-base text-blue-h1p/70 text-center max-w-4xl font-medium">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
}

defineProps<Props>()
</script> 