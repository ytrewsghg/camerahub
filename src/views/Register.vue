<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-left">
        <div class="left-overlay"></div>
        <div class="left-content">
          <h2>加入 CameraHub</h2>
          <p>开启你的影像之旅</p>
          <div class="features">
            <div class="feature-item" v-for="f in features" :key="f.icon">
              <span class="feature-icon">{{ f.icon }}</span>
              <span>{{ f.text }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="register-right">
        <div class="register-form-wrapper">
          <router-link to="/" class="form-logo">
            <span>📷</span>
            <span class="logo-text">CameraHub</span>
          </router-link>
          <h1 class="form-title">创建账号</h1>
          <p class="form-subtitle">注册成为 CameraHub 会员</p>
          <form @submit.prevent="handleRegister" class="register-form">
            <div class="form-group">
              <label>用户名</label>
              <div class="input-wrapper">
                <span class="input-icon">👤</span>
                <input v-model="form.username" type="text" placeholder="请输入用户名" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>手机号</label>
                <div class="input-wrapper">
                  <span class="input-icon">📱</span>
                  <input v-model="form.phone" type="tel" placeholder="请输入手机号" required />
                </div>
              </div>
              <div class="form-group">
                <label>邮箱</label>
                <div class="input-wrapper">
                  <span class="input-icon">📧</span>
                  <input v-model="form.email" type="email" placeholder="请输入邮箱" required />
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>密码</label>
                <div class="input-wrapper">
                  <span class="input-icon">🔒</span>
                  <input v-model="form.password" type="password" placeholder="请输入密码" required />
                </div>
              </div>
              <div class="form-group">
                <label>确认密码</label>
                <div class="input-wrapper">
                  <span class="input-icon">🔒</span>
                  <input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" required />
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-lg register-btn" :disabled="isLoading">
              <span v-if="isLoading" class="spinner"></span>
              {{ isLoading ? '注册中...' : '注 册' }}
            </button>
          </form>
          <p class="to-login">
            已有账号？<router-link to="/login">立即登录</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../utils/auth.js'
import { useToast } from '../utils/toast.js'

const router = useRouter()
const toast = useToast()

const form = ref({ username: '', phone: '', email: '', password: '', confirmPassword: '' })
const isLoading = ref(false)

const features = [
  { icon: '🛡️', text: '实名认证，安全可靠' },
  { icon: '🔍', text: 'AI检测，正品保障' },
  { icon: '💰', text: '智能估值，公平透明' },
  { icon: '🔧', text: '售后无忧，放心交易' }
]

const handleRegister = async () => {
  if (!form.value.username || !form.value.phone || !form.value.email || !form.value.password) {
    toast.warning('请填写完整信息')
    return
  }
  if (form.value.password !== form.value.confirmPassword) {
    toast.error('两次密码输入不一致')
    return
  }
  if (form.value.password.length < 6) {
    toast.warning('密码至少6位')
    return
  }
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1000))
  const result = register({ username: form.value.username, phone: form.value.phone, email: form.value.email, password: form.value.password })
  isLoading.value = false
  if (result.success) {
    toast.success('注册成功！请登录')
    router.push('/login')
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.register-container {
  display: flex;
  width: 100%;
  max-width: 1100px;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  min-height: 640px;
  animation: scaleIn 0.5s ease;
}

.register-left {
  flex: 1;
  background: url('https://images.unsplash.com/photo-1502920917128-1aae5735790e?w=800&h=1000&fit=crop') center/cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.9), rgba(15, 23, 42, 0.8));
}

.left-content {
  position: relative;
  z-index: 1;
  color: white;
  padding: 48px;
}

.left-content h2 {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 12px;
}

.left-content > p {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 40px;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  font-weight: 500;
}

.feature-icon {
  font-size: 22px;
}

.register-right {
  flex: 1.2;
  background: var(--card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
}

.register-form-wrapper {
  width: 100%;
  max-width: 440px;
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
  margin-bottom: 28px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 18px;
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
  padding: 12px 14px 12px 44px;
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

.register-btn {
  width: 100%;
  height: 50px;
  font-size: 16px;
  margin-top: 8px;
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

.to-login {
  text-align: center;
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 24px;
}

.to-login a {
  color: var(--primary);
  font-weight: 600;
}

@media (max-width: 768px) {
  .register-left {
    display: none;
  }
  .register-right {
    padding: 32px 24px;
  }
  .register-container {
    max-width: 440px;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
