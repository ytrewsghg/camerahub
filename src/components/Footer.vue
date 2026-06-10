<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-icon">📷</span>
            <span class="logo-text">CameraHub</span>
          </div>
          <p class="footer-desc">专业相机租赁与二手保真交易平台，让每一次快门都值得信赖。</p>
          <div class="footer-social">
            <a href="#" class="social-link">💬</a>
            <a href="#" class="social-link">📱</a>
            <a href="#" class="social-link">📧</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>租赁服务</h4>
          <router-link to="/rental">相机租赁</router-link>
          <router-link to="/rental">镜头租赁</router-link>
          <router-link to="/rental">无人机租赁</router-link>
          <router-link to="/rental">稳定器租赁</router-link>
        </div>
        <div class="footer-col">
          <h4>二手交易</h4>
          <router-link to="/secondhand">二手相机</router-link>
          <router-link to="/secondhand">二手镜头</router-link>
          <router-link to="/publish">发布闲置</router-link>
          <router-link to="/ai-detection">AI估值</router-link>
        </div>
        <div class="footer-col">
          <h4>关于我们</h4>
          <a href="#">关于CameraHub</a>
          <a href="#">用户协议</a>
          <a href="#">隐私政策</a>
          <a href="#">联系客服</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 CameraHub. All rights reserved.</p>
        <p>专业相机租赁与二手保真交易平台</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  padding: 64px 0 0;
  margin-top: 80px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 16px;
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

.footer-desc {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 20px;
}

.footer-social {
  display: flex;
  gap: 12px;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: var(--transition);
}

.social-link:hover {
  background: var(--primary);
  transform: translateY(-2px);
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-col h4 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.footer-col a {
  font-size: 14px;
  color: var(--text-secondary);
  transition: var(--transition);
}

.footer-col a:hover {
  color: var(--primary);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  margin-top: 48px;
  border-top: 1px solid var(--border);
  font-size: 13px;
  color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .footer-brand {
    grid-column: 1 / -1;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}
</style>
