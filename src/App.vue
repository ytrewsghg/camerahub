<template>
  <div class="app" :class="{ dark: isDark }">
    <Navbar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
    <Toast />
    <BackToTop />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Toast from './components/Toast.vue'
import BackToTop from './components/BackToTop.vue'

const isDark = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('camerahub_dark')
  if (saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('camerahub_dark', isDark.value)
}

provide('isDark', isDark)
provide('toggleDark', toggleDark)
</script>

<style scoped>
.main-content {
  min-height: calc(100vh - var(--navbar-height));
  padding-top: var(--navbar-height);
}
</style>
