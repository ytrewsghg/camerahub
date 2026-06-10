<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <transition name="hero-fade" mode="out-in">
          <div class="hero-slide" :key="currentSlide" :style="{ backgroundImage: `url(${slides[currentSlide].image})` }"></div>
        </transition>
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content container">
        <transition name="slide-up" mode="out-in">
          <div :key="currentSlide">
            <h1 class="hero-title">{{ slides[currentSlide].title }}</h1>
            <p class="hero-subtitle">{{ slides[currentSlide].subtitle }}</p>
            <div class="hero-btns">
              <router-link :to="slides[currentSlide].btn1Link" class="btn btn-primary btn-lg">{{ slides[currentSlide].btn1 }}</router-link>
              <router-link :to="slides[currentSlide].btn2Link" class="btn btn-outline btn-lg" style="color:#fff;border-color:rgba(255,255,255,0.4)">{{ slides[currentSlide].btn2 }}</router-link>
              <router-link to="/ai-detection" class="btn btn-accent btn-lg">🤖 AI检测</router-link>
            </div>
          </div>
        </transition>
      </div>
      <div class="hero-indicators">
        <button v-for="(_, i) in slides" :key="i" class="indicator" :class="{ active: i === currentSlide }" @click="goSlide(i)"></button>
      </div>
    </section>

    <!-- Featured Devices -->
    <section class="section featured">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">🔥 热门设备</h2>
            <p class="section-subtitle">精选最受欢迎的相机与设备</p>
          </div>
          <router-link to="/rental" class="btn btn-ghost">查看全部 →</router-link>
        </div>
        <div v-if="loading" class="devices-grid">
          <SkeletonCard v-for="i in 8" :key="i" />
        </div>
        <div v-else class="devices-grid">
          <DeviceCard v-for="device in featuredDevices" :key="device.id" :device="device" />
        </div>
      </div>
    </section>

    <!-- Platform Advantages -->
    <section class="section advantages">
      <div class="container">
        <h2 class="section-title" style="text-align:center">为什么选择 CameraHub</h2>
        <p class="section-subtitle" style="text-align:center">专业、安全、透明的一站式相机服务平台</p>
        <div class="advantages-grid">
          <div v-for="(adv, i) in advantageList" :key="i" class="advantage-card" :style="{ animationDelay: `${i * 0.1}s` }">
            <div class="adv-icon">{{ adv.icon }}</div>
            <h3 class="adv-title">{{ adv.title }}</h3>
            <p class="adv-desc">{{ adv.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Second-hand Section -->
    <section class="section secondhand-section">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">💰 二手好物</h2>
            <p class="section-subtitle">经过AI检测认证的优质二手设备</p>
          </div>
          <router-link to="/secondhand" class="btn btn-ghost">浏览更多 →</router-link>
        </div>
        <div class="products-grid">
          <ProductCard v-for="item in featuredProducts" :key="item.id" :item="item" />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container cta-inner">
        <h2 class="cta-title">准备好开始你的影像之旅了吗？</h2>
        <p class="cta-desc">加入 CameraHub，享受专业、安全、透明的相机租赁与交易服务</p>
        <div class="cta-btns">
          <router-link to="/rental" class="btn btn-primary btn-lg">立即租赁</router-link>
          <router-link to="/publish" class="btn btn-accent btn-lg">发布闲置</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { rentalDevices, secondHandItems, heroSlides, advantages } from '../data/mock.js'
import DeviceCard from '../components/DeviceCard.vue'
import ProductCard from '../components/ProductCard.vue'
import SkeletonCard from '../components/SkeletonCard.vue'

const loading = ref(true)
const currentSlide = ref(0)
const slides = heroSlides
const advantageList = advantages
let slideTimer = null

const featuredDevices = computed(() => rentalDevices.slice(0, 8))
const featuredProducts = computed(() => secondHandItems.slice(0, 4))

const goSlide = (i) => { currentSlide.value = i }

onMounted(() => {
  setTimeout(() => { loading.value = false }, 1200)
  slideTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
})

onUnmounted(() => {
  if (slideTimer) clearInterval(slideTimer)
})
</script>

<style scoped>
.hero {
  position: relative;
  height: 92vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: opacity 1s ease;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(37, 99, 235, 0.35) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  max-width: 720px;
}

.hero-title {
  font-size: 56px;
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 20px;
  font-weight: 400;
  opacity: 0.9;
  margin-bottom: 36px;
  line-height: 1.6;
}

.hero-btns {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-indicators {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 2;
}

.indicator {
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  cursor: pointer;
  transition: var(--transition);
}

.indicator.active {
  width: 48px;
  background: white;
}

.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 1s ease;
}

.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  animation: slideUp 0.8s ease;
}

.slide-up-leave-active {
  animation: slideUp 0.4s ease reverse;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}

.section-header .section-subtitle {
  margin-bottom: 0;
}

.devices-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.advantages {
  background: var(--bg-secondary);
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.advantage-card {
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  padding: 36px 28px;
  text-align: center;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  border: 1px solid var(--border-light);
  animation: slideUp 0.6s ease forwards;
  animation-fill-mode: both;
}

.advantage-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--card-shadow-hover);
}

.adv-icon {
  font-size: 48px;
  margin-bottom: 20px;
  display: block;
  animation: float 3s ease-in-out infinite;
}

.adv-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.adv-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.cta-section {
  background: var(--primary-gradient);
  padding: 80px 0;
  text-align: center;
  color: white;
}

.cta-title {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.cta-desc {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 36px;
}

.cta-btns {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.cta-btns .btn {
  min-width: 160px;
}

@media (max-width: 1024px) {
  .devices-grid,
  .products-grid,
  .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hero-title {
    font-size: 42px;
  }
}

@media (max-width: 768px) {
  .hero {
    height: 80vh;
    min-height: 500px;
  }
  .hero-title {
    font-size: 32px;
  }
  .hero-subtitle {
    font-size: 16px;
  }
  .hero-btns {
    flex-direction: column;
  }
  .hero-btns .btn {
    width: 100%;
    justify-content: center;
  }
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .cta-title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .devices-grid,
  .products-grid {
    grid-template-columns: 1fr;
  }
  .advantages-grid {
    grid-template-columns: 1fr 1fr;
  }
  .hero-title {
    font-size: 26px;
  }
}
</style>
