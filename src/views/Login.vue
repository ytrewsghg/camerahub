<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-left">
        <div class="login-form-wrapper">
          <router-link to="/" class="form-logo">
            <span>📷</span>
            <span class="logo-text">CameraHub</span>
          </router-link>
          <h1 class="form-title">欢迎回来</h1>
          <p class="form-subtitle">登录你的 CameraHub 账号</p>
          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <label>账号</label>
              <div class="input-wrapper">
                <span class="input-icon">👤</span>
                <input v-model="form.username" type="text" placeholder="用户名 / 手机号 / 邮箱" required />
              </div>
            </div>
            <div class="form-group">
              <label>密码</label>
              <div class="input-wrapper">
                <span class="input-icon">🔒</span>
                <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="请输入密码" required />
                <button type="button" class="toggle-pwd" @click="showPassword = !showPassword">
                  {{ showPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>
            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.remember" />
                <span>记住密码</span>
              </label>
              <a href="#" class="forgot-link">忘记密码？</a>
            </div>
            <button type="submit" class="btn btn-primary btn-lg login-btn" :disabled="isLoading">
              <span v-if="isLoading" class="spinner"></span>
              {{ isLoading ? '登录中...' : '登 录' }}
            </button>
          </form>
          <div class="divider">
            <span>其他登录方式</span>
          </div>
          <div class="social-login">
            <button class="social-btn qq" @click="socialLogin('QQ')">
              <span>🐧</span> QQ登录
            </button>
            <button class="social-btn wechat" @click="socialLogin('微信')">
              <span>💬</span> 微信登录
            </button>
          </div>
          <p class="to-register">
            还没有账号？<router-link to="/register">立即注册</router-link>
          </p>
        </div>
      </div>
      <div class="login-right">
        <div class="right-overlay"></div>
        <div class="right-content">
          <h2>记录每一刻精彩</h2>
          <p>专业设备 · AI保真 · 放心租赁</p>
          <div class="stats">
            <div class="stat">
              <span class="stat-num">10,000+</span>
              <span class="stat-label">注册用户</span>
            </div>
            <div class="stat">
              <span class="stat-num">500+</span>
              <span class="stat-label">专业设备</span>
            </div>
            <div class="stat">
              <span class="stat-num">99.8%</span>
              <span class="stat-label">好评率</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login, socialLogin as socialLoginApi, setUser } from '../utils/auth.js'
import { useToast } from '../utils/toast.js'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const form = ref({ username: '', password: '', remember: false })
const showPassword = ref(false)
const isLoading = ref(false)

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('camerahub_remember') || 'null')
  if (saved) {
    form.value.username = saved.username
    form.value.password = saved.password
    form.value.remember = true
  }
})

const handleLogin = async () => {
  if (!form.value.username || !form.value.password) {
    toast.warning('请填写完整信息')
    return
  }
  isLoading.value = true
  await new Promise(r => setTimeout(r, 800))
  const result = login(form.value.username, form.value.password)
  isLoading.value = false
  if (result.success) {
    if (form.value.remember) {
      localStorage.setItem('camerahub_remember', JSON.stringify({ username: form.value.username, password: form.value.password }))
    } else {
      localStorage.removeItem('camerahub_remember')
    }
    toast.success('登录成功，欢迎回来！')
    window.dispatchEvent(new Event('userChanged'))
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } else {
    toast.error(result.message)
  }
}

const socialLogin = async (platform) => {
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1000))
  const result = socialLoginApi(platform)
  isLoading.value = false
  if (result.success) {
    toast.success(`${platform}登录成功！`)
    window.dispatchEvent(new Event('userChanged'))
    router.push('/')
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.login-container {
  display: flex;
  width: 100%;
  max-width: 1040px;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  min-height: 620px;
  animation: scaleIn 0.5s ease;
}

.login-left {
  flex: 1;
  background: var(--card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
}

.login-form-wrapper {
  width: 100%;
  max-width: 380px;
}

.form-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 32px;
  color: var(--text-primary);
}

.logo-text {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.form-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.form-subtitle {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  font-size: 16px;
}

.input-wrapper input {
  width: 100%;
  padding: 14px 14px 14px 44px;
  border: 2px solid var(--border);
  border-radius: var(--radius-lg);
  font-size: 15px;
  color: var(--text-primary);
  background: var(--bg-primary);
  transition: var(--transition);
}

.input-wrapper input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.toggle-pwd {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-size: 14px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  cursor: pointer;
}

.checkbox-label input {
  accent-color: var(--primary);
}

.forgot-link {
  color: var(--primary);
  font-weight: 500;
}

.login-btn {
  width: 100%;
  height: 50px;
  font-size: 16px;
  position: relative;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  display: inline-block;
}

.divider {
  display: flex;
  align-items: center;
  margin: 28px 0;
  gap: 16px;
  color: var(--text-tertiary);
  font-size: 13px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.social-login {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.social-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: var(--radius-lg);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  border: 2px solid var(--border);
  background: var(--bg-primary);
  color: var(--text-primary);
}

.social-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--card-shadow);
}

.social-btn.qq:hover {
  border-color: #12B7F5;
  background: rgba(18, 183, 245, 0.05);
}

.social-btn.wechat:hover {
  border-color: #07C160;
  background: rgba(7, 193, 96, 0.05);
}

.to-register {
  text-align: center;
  font-size: 14px;
  color: var(--text-secondary);
}

.to-register a {
  color: var(--primary);
  font-weight: 600;
}

.login-right {
  flex: 1;
  background: url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=1000&fit=crop') center/cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.85), rgba(15, 23, 42, 0.7));
}

.right-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 40px;
}

.right-content h2 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 12px;
}

.right-content p {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 40px;
}

.stats {
  display: flex;
  gap: 32px;
  justify-content: center;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-num {
  font-size: 24px;
  font-weight: 800;
}

.stat-label {
  font-size: 13px;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .login-right {
    display: none;
  }
  .login-left {
    padding: 32px 24px;
  }
  .login-container {
    max-width: 440px;
  }
}
</style>
