<template>
  <div class="flex flex-col min-h-screen justify-between">
    <Navbar v-if="!isChatPage"/>
    <slot />
    <Footer v-if="!isChatPage"/>
    <BackToTop v-if="!isChatPage"/>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '~/components/Navbar.vue'

const Footer = defineAsyncComponent(() => import('~/components/Footer.vue'))
const BackToTop = defineAsyncComponent(() => import('~/components/BackToTop.vue'))

const route = useRoute()
const isChatPage = computed(() => route.path === '/chat')
</script>