<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-inner container">
      <router-link to="/" class="logo">
        <span class="logo-icon">📷</span>
        <span class="logo-text">CameraHub</span>
      </router-link>
      <div class="nav-links" :class="{ open: menuOpen }">
        <router-link to="/" class="nav-link" @click="menuOpen = false">首页</router-link>
        <router-link to="/rental" class="nav-link" @click="menuOpen = false">相机租赁</router-link>
        <router-link to="/secondhand" class="nav-link" @click="menuOpen = false">二手交易</router-link>
        <router-link to="/ai-detection" class="nav-link" @click="menuOpen = false">AI检测</router-link>
        <router-link to="/dashboard" class="nav-link" @click="menuOpen = false">数据后台</router-link>
      </div>
      <div class="nav-right">
        <button class="theme-toggle" @click="toggleDark" :title="isDark ? '切换亮色' : '切换暗色'">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
        <template v-if="user">
          <router-link to="/profile" class="nav-user">
            <span class="nav-avatar">{{ user.avatar }}</span>
            <span class="nav-username">{{ user.username }}</span>
          </router-link>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-ghost btn-sm">登录</router-link>
          <router-link to="/register" class="btn btn-primary btn-sm">注册</router-link>
        </template>
        <button class="menu-btn" @click="menuOpen = !menuOpen">
          <span :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { getUser, removeUser } from '../utils/auth.js'

const isDark = inject('isDark')
const toggleDark = inject('toggleDark')
const user = ref(getUser())
const isScrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('storage', () => { user.value = getUser() })
  window.dispatchEvent(new Event('userChanged'))
  window.addEventListener('userChanged', () => { user.value = getUser() })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--navbar-height);
  background: var(--navbar-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 1000;
  transition: var(--transition);
  border-bottom: 1px solid transparent;
}

.navbar.scrolled {
  border-bottom-color: var(--border-light);
  box-shadow: var(--navbar-shadow);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 22px;
  color: var(--text-primary);
  transition: var(--transition);
}

.logo:hover {
  transform: scale(1.03);
}

.logo-icon {
  font-size: 28px;
}

.logo-text {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link {
  padding: 8px 18px;
  border-radius: var(--radius-full);
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary);
  transition: var(--transition);
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  color: var(--primary);
  background: rgba(37, 99, 235, 0.08);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-toggle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  font-size: 16px;
  transition: var(--transition);
  border: none;
  cursor: pointer;
}

.theme-toggle:hover {
  transform: rotate(30deg) scale(1.1);
}

.nav-user {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  background: var(--bg-tertiary);
  transition: var(--transition);
}

.nav-user:hover {
  background: rgba(37, 99, 235, 0.1);
}

.nav-avatar {
  font-size: 20px;
}

.nav-username {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.menu-btn {
  display: none;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: var(--bg-tertiary);
  border: none;
  cursor: pointer;
  position: relative;
}

.menu-btn span,
.menu-btn span::before,
.menu-btn span::after {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  position: absolute;
  left: 50%;
  transition: var(--transition);
}

.menu-btn span {
  top: 50%;
  transform: translate(-50%, -50%);
}

.menu-btn span::before {
  content: '';
  top: -6px;
  left: 0;
  transform: translateX(-50%);
}

.menu-btn span::after {
  content: '';
  top: 6px;
  left: 0;
  transform: translateX(-50%);
}

.menu-btn span.open {
  background: transparent;
}

.menu-btn span.open::before {
  top: 0;
  transform: translateX(-50%) rotate(45deg);
}

.menu-btn span.open::after {
  top: 0;
  transform: translateX(-50%) rotate(-45deg);
}

@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: var(--navbar-height);
    left: 0;
    right: 0;
    background: var(--bg-primary);
    flex-direction: column;
    padding: 20px;
    gap: 4px;
    border-bottom: 1px solid var(--border);
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: var(--transition);
  }

  .nav-links.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    padding: 14px;
  }

  .menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-username {
    display: none;
  }
}
</style>
