<template>
  <div class="detail-page" v-if="device">
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">首页</router-link>
        <span>/</span>
        <router-link to="/rental">相机租赁</router-link>
        <span>/</span>
        <span class="current">{{ device.name }}</span>
      </div>
      <div class="detail-grid">
        <div class="detail-images">
          <div class="main-image">
            <img :src="device.image" :alt="device.name" @error="handleImgError" />
          </div>
          <div class="image-thumbs">
            <div v-for="(img, i) in [device.image, ...(device.tags?.map(() => device.image) || [])]" :key="i" class="thumb" :class="{ active: activeImg === i }" @click="activeImg = i">
              <img :src="img" @error="handleImgError" />
            </div>
          </div>
        </div>
        <div class="detail-info">
          <div class="detail-tags">
            <span class="tag tag-primary" v-for="tag in device.tags" :key="tag">{{ tag }}</span>
          </div>
          <h1 class="detail-name">{{ device.name }}</h1>
          <p class="detail-brand">{{ device.brand }} · {{ device.category }}</p>
          <div class="detail-rating">
            <span class="stars">{{ '★'.repeat(Math.floor(device.rating)) }}</span>
            <span class="rating-num">{{ device.rating }} 分</span>
            <span class="rating-count">（已租 {{ 50 + device.id * 7 }} 次）</span>
          </div>
          <div class="price-block">
            <div class="rental-price">
              <span class="label">日租金</span>
              <span class="price">¥{{ device.price }}</span>
              <span class="unit">/天</span>
            </div>
            <div class="deposit">
              <span class="label">押金</span>
              <span class="amount">¥{{ device.deposit.toLocaleString() }}</span>
            </div>
          </div>
          <div class="stock-info">
            <span class="stock-dot" :class="{ available: device.stock > 0 }"></span>
            <span>{{ device.stock > 0 ? `可租 ${device.stock} 件` : '暂时缺货' }}</span>
          </div>
          <div class="detail-actions">
            <button class="btn btn-primary btn-lg" @click="showRentModal = true" :disabled="device.stock <= 0">
              🏷️ 立即租赁
            </button>
            <button class="btn btn-outline btn-lg" @click="toggleFavorite">
              {{ isFav ? '❤️ 已收藏' : '🤍 收藏' }}
            </button>
          </div>
        </div>
      </div>
      <div class="detail-sections">
        <div class="section-block">
          <h2 class="block-title">设备参数</h2>
          <div class="specs-grid">
            <div class="spec-item" v-for="(val, key) in device.specs" :key="key">
              <span class="spec-label">{{ specLabels[key] || key }}</span>
              <span class="spec-value">{{ val }}</span>
            </div>
          </div>
        </div>
        <div class="section-block">
          <h2 class="block-title">设备介绍</h2>
          <p class="device-desc">{{ device.description }}</p>
        </div>
      </div>
    </div>

    <!-- Rent Modal -->
    <transition name="modal">
      <div class="modal-overlay" v-if="showRentModal" @click.self="showRentModal = false">
        <div class="modal-content">
          <div class="modal-header">
            <h3>租赁设备</h3>
            <button class="modal-close" @click="showRentModal = false">✕</button>
          </div>
          <div class="modal-body">
            <div class="modal-device">{{ device.name }}</div>
            <div class="form-group">
              <label>姓名</label>
              <input v-model="rentForm.name" type="text" placeholder="请输入姓名" />
            </div>
            <div class="form-group">
              <label>手机号</label>
              <input v-model="rentForm.phone" type="tel" placeholder="请输入手机号" />
            </div>
            <div class="form-group">
              <label>租赁天数</label>
              <div class="days-selector">
                <button v-for="d in [1, 3, 5, 7, 14, 30]" :key="d" class="day-btn" :class="{ active: rentForm.days === d }" @click="rentForm.days = d">
                  {{ d }}天
                </button>
              </div>
            </div>
            <div class="rent-summary">
              <div class="summary-row">
                <span>日租金</span><span>¥{{ device.price }}/天</span>
              </div>
              <div class="summary-row">
                <span>租赁天数</span><span>{{ rentForm.days }}天</span>
              </div>
              <div class="summary-row total">
                <span>租金合计</span><span class="total-price">¥{{ device.price * rentForm.days }}</span>
              </div>
              <div class="summary-row">
                <span>押金（归还退还）</span><span>¥{{ device.deposit.toLocaleString() }}</span>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" @click="showRentModal = false">取消</button>
            <button class="btn btn-primary" @click="submitRent" :disabled="isSubmitting">
              {{ isSubmitting ? '提交中...' : '确认租赁' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <div v-else class="empty-state container">
    <span class="empty-icon">😕</span>
    <p>未找到该设备</p>
    <router-link to="/rental" class="btn btn-ghost">返回租赁列表</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { rentalDevices } from '../data/mock.js'
import { getUser } from '../utils/auth.js'
import { useToast } from '../utils/toast.js'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const device = computed(() => rentalDevices.find(d => d.id === Number(route.params.id)))
const activeImg = ref(0)
const showRentModal = ref(false)
const isFav = ref(false)
const isSubmitting = ref(false)
const rentForm = ref({ name: '', phone: '', days: 3 })

const specLabels = { sensor: '传感器', video: '视频性能', iso: 'ISO范围', weight: '重量', af: '对焦系统', stabilizer: '防抖' }

const toggleFavorite = () => {
  if (!getUser()) { toast.warning('请先登录'); router.push('/login'); return }
  isFav.value = !isFav.value
  toast.success(isFav.value ? '已收藏' : '已取消收藏')
}

const submitRent = async () => {
  if (!getUser()) { toast.warning('请先登录'); router.push('/login'); return }
  if (!rentForm.value.name || !rentForm.value.phone) { toast.warning('请填写完整信息'); return }
  isSubmitting.value = true
  await new Promise(r => setTimeout(r, 1000))
  isSubmitting.value = false
  showRentModal.value = false
  toast.success(`租赁成功！${device.value.name} × ${rentForm.value.days}天`)
}

const handleImgError = (e) => {
  e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" fill="%23f1f5f9"><rect width="600" height="400"/><text x="300" y="200" text-anchor="middle" fill="%2394a3b8" font-size="48">📷</text></svg>')
}
</script>

<style scoped>
.detail-page {
  padding: 32px 0 60px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-tertiary);
  margin-bottom: 32px;
}

.breadcrumb a {
  color: var(--text-secondary);
  transition: var(--transition);
}

.breadcrumb a:hover { color: var(--primary); }

.breadcrumb .current {
  color: var(--text-primary);
  font-weight: 500;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.main-image {
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--bg-tertiary);
  aspect-ratio: 4/3;
  margin-bottom: 16px;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-thumbs {
  display: flex;
  gap: 12px;
}

.thumb {
  width: 72px;
  height: 54px;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: var(--transition);
}

.thumb.active,
.thumb:hover {
  border-color: var(--primary);
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  padding: 4px 14px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
}

.tag-primary {
  background: rgba(37, 99, 235, 0.1);
  color: var(--primary);
}

.detail-name {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.detail-brand {
  font-size: 15px;
  color: var(--text-tertiary);
  margin-bottom: 16px;
}

.detail-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 14px;
}

.stars { color: var(--accent); letter-spacing: 2px; }
.rating-num { font-weight: 700; color: var(--text-primary); }
.rating-count { color: var(--text-tertiary); }

.price-block {
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  padding: 24px;
  margin-bottom: 16px;
}

.rental-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
}

.rental-price .label,
.deposit .label {
  font-size: 14px;
  color: var(--text-tertiary);
  min-width: 50px;
}

.rental-price .price {
  font-size: 40px;
  font-weight: 900;
  color: var(--danger);
}

.rental-price .unit {
  font-size: 15px;
  color: var(--text-tertiary);
}

.deposit {
  display: flex;
  align-items: center;
  gap: 8px;
}

.deposit .amount {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.stock-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  font-size: 14px;
  color: var(--text-secondary);
}

.stock-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--danger);
}

.stock-dot.available {
  background: var(--success);
}

.detail-actions {
  display: flex;
  gap: 12px;
}

.detail-actions .btn {
  flex: 1;
}

.detail-sections {
  display: grid;
  gap: 32px;
}

.section-block {
  background: var(--card-bg);
  border-radius: var(--radius-xl);
  padding: 32px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-light);
}

.block-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.spec-label {
  font-size: 13px;
  color: var(--text-tertiary);
  font-weight: 500;
}

.spec-value {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.device-desc {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 24px;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--card-bg);
  border-radius: var(--radius-2xl);
  width: 100%;
  max-width: 520px;
  animation: scaleIn 0.3s ease;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  border-bottom: 1px solid var(--border);
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 700;
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  border: none;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  padding: 28px;
}

.modal-device {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 20px;
  padding: 12px 16px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 15px;
  color: var(--text-primary);
  background: var(--bg-primary);
}

.form-group input:focus {
  border-color: var(--primary);
}

.days-selector {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.day-btn {
  padding: 8px 16px;
  border-radius: var(--radius-full);
  border: 2px solid var(--border);
  background: var(--bg-primary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  color: var(--text-primary);
}

.day-btn.active,
.day-btn:hover {
  border-color: var(--primary);
  background: rgba(37, 99, 235, 0.1);
  color: var(--primary);
}

.rent-summary {
  margin-top: 20px;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.summary-row.total {
  border-top: 1px solid var(--border);
  margin-top: 8px;
  padding-top: 12px;
  font-weight: 700;
  color: var(--text-primary);
}

.total-price {
  font-size: 24px;
  font-weight: 800;
  color: var(--danger);
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 20px 28px;
  border-top: 1px solid var(--border);
}

.modal-footer .btn {
  flex: 1;
}

.modal-enter-active { animation: fadeIn 0.3s ease; }
.modal-leave-active { animation: fadeIn 0.2s ease reverse; }

.empty-state {
  text-align: center;
  padding: 120px 20px;
}

.empty-icon { font-size: 56px; display: block; margin-bottom: 16px; }
.empty-state p { font-size: 16px; color: var(--text-secondary); margin-bottom: 20px; }

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .detail-name { font-size: 24px; }
  .specs-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
