<template>
  <div class="notfound-page">
    <div class="notfound-content">
      <div class="error-code">4<span class="zero">0</span>4</div>
      <h1 class="error-title">页面走丢了</h1>
      <p class="error-desc">你访问的页面不存在，可能已被移动或删除</p>
      <div class="error-actions">
        <router-link to="/" class="btn btn-primary btn-lg">🏠 返回首页</router-link>
        <router-link to="/rental" class="btn btn-outline btn-lg">📷 浏览设备</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notfound-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.notfound-content {
  text-align: center;
  animation: slideUp 0.6s ease;
}

.error-code {
  font-size: 120px;
  font-weight: 900;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 24px;
}

.zero {
  display: inline-block;
  animation: float 3s ease-in-out infinite;
}

.error-title {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.error-desc {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 36px;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(5deg); }
}
</style>
