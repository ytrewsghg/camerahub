<template>
  <div class="detail-page" v-if="item">
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">首页</router-link><span>/</span>
        <router-link to="/secondhand">二手交易</router-link><span>/</span>
        <span class="current">{{ item.name }}</span>
      </div>
      <div class="detail-grid">
        <div class="detail-images">
          <div class="main-image">
            <img :src="item.images?.[activeImg]" :alt="item.name" @error="handleImgError" />
          </div>
          <div class="image-thumbs">
            <div v-for="(img, i) in item.images" :key="i" class="thumb" :class="{ active: activeImg === i }" @click="activeImg = i">
              <img :src="img" @error="handleImgError" />
            </div>
          </div>
        </div>
        <div class="detail-info">
          <div class="detail-tags">
            <span class="tag tag-warning">{{ item.condition }}</span>
            <span class="tag tag-primary" v-for="tag in item.tags?.slice(0, 2)" :key="tag">{{ tag }}</span>
          </div>
          <h1 class="detail-name">{{ item.name }}</h1>
          <div class="price-section">
            <span class="current-price">¥{{ item.price.toLocaleString() }}</span>
            <span class="original-price">原价 ¥{{ item.originalPrice.toLocaleString() }}</span>
            <span class="save-tag">省 ¥{{ (item.originalPrice - item.price).toLocaleString() }}</span>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">成色</span>
              <span class="info-value">{{ item.condition }}（{{ item.conditionScore }}分）</span>
            </div>
            <div class="info-item">
              <span class="info-label">使用年限</span>
              <span class="info-value">{{ item.useYears }}年</span>
            </div>
            <div class="info-item">
              <span class="info-label">快门次数</span>
              <span class="info-value">{{ item.shutterCount.toLocaleString() }}次</span>
            </div>
            <div class="info-item">
              <span class="info-label">发布时间</span>
              <span class="info-value">{{ item.createdAt }}</span>
            </div>
          </div>
          <div class="seller-card">
            <span class="seller-avatar">{{ item.seller.avatar }}</span>
            <div class="seller-detail">
              <span class="seller-name">{{ item.seller.name }}</span>
              <span class="seller-meta">信用 ★{{ item.seller.rating }} · 成交{{ item.seller.sales }}笔</span>
            </div>
          </div>
          <div class="detail-actions">
            <button class="btn btn-accent btn-lg" @click="handleBuy">💳 立即购买</button>
            <button class="btn btn-outline btn-lg" @click="handleContact">💬 联系卖家</button>
            <button class="btn btn-ghost btn-lg" @click="toggleFav">{{ isFav ? '❤️' : '🤍' }}</button>
          </div>
        </div>
      </div>
      <div class="desc-section">
        <h2 class="block-title">商品描述</h2>
        <p class="desc-text">{{ item.description }}</p>
      </div>
    </div>
  </div>
  <div v-else class="empty-state container">
    <span class="empty-icon">😕</span>
    <p>未找到该商品</p>
    <router-link to="/secondhand" class="btn btn-ghost">返回列表</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { secondHandItems } from '../data/mock.js'
import { getUser } from '../utils/auth.js'
import { useToast } from '../utils/toast.js'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const item = computed(() => secondHandItems.find(i => i.id === Number(route.params.id)))
const activeImg = ref(0)
const isFav = ref(false)

const handleBuy = () => {
  if (!getUser()) { toast.warning('请先登录'); router.push('/login'); return }
  toast.success('购买请求已发送，等待卖家确认！')
}

const handleContact = () => {
  if (!getUser()) { toast.warning('请先登录'); router.push('/login'); return }
  toast.info('已向卖家发送消息')
}

const toggleFav = () => {
  if (!getUser()) { toast.warning('请先登录'); router.push('/login'); return }
  isFav.value = !isFav.value
  toast.success(isFav.value ? '已收藏' : '已取消收藏')
}

const handleImgError = (e) => {
  e.target.src = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" fill="%23f1f5f9"><rect width="600" height="400"/><text x="300" y="200" text-anchor="middle" fill="%2394a3b8" font-size="48">📷</text></svg>')
}
</script>

<style scoped>
.detail-page { padding: 32px 0 60px; }

.breadcrumb {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; color: var(--text-tertiary); margin-bottom: 32px;
}
.breadcrumb a { color: var(--text-secondary); transition: var(--transition); }
.breadcrumb a:hover { color: var(--primary); }
.breadcrumb .current { color: var(--text-primary); font-weight: 500; }

.detail-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 48px; margin-bottom: 48px;
}

.main-image {
  border-radius: var(--radius-xl); overflow: hidden;
  background: var(--bg-tertiary); aspect-ratio: 4/3; margin-bottom: 16px;
}
.main-image img { width: 100%; height: 100%; object-fit: cover; }

.image-thumbs { display: flex; gap: 12px; }
.thumb {
  width: 72px; height: 54px; border-radius: var(--radius-md);
  overflow: hidden; cursor: pointer; border: 2px solid transparent; transition: var(--transition);
}
.thumb.active, .thumb:hover { border-color: var(--primary); }
.thumb img { width: 100%; height: 100%; object-fit: cover; }

.detail-tags { display: flex; gap: 8px; margin-bottom: 16px; }
.tag { padding: 4px 14px; border-radius: var(--radius-full); font-size: 12px; font-weight: 600; }
.tag-primary { background: rgba(37, 99, 235, 0.1); color: var(--primary); }
.tag-warning { background: rgba(245, 158, 11, 0.1); color: var(--accent); }

.detail-name {
  font-size: 32px; font-weight: 800; color: var(--text-primary); margin-bottom: 16px;
}

.price-section {
  display: flex; align-items: baseline; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;
}
.current-price { font-size: 36px; font-weight: 900; color: var(--danger); }
.original-price { font-size: 15px; color: var(--text-tertiary); text-decoration: line-through; }
.save-tag {
  font-size: 12px; font-weight: 600; color: var(--success);
  background: rgba(34, 197, 94, 0.1); padding: 4px 12px; border-radius: var(--radius-full);
}

.info-grid {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 16px; margin-bottom: 24px;
  padding: 20px; background: var(--bg-secondary);
  border-radius: var(--radius-lg);
}
.info-item { display: flex; flex-direction: column; gap: 4px; }
.info-label { font-size: 12px; color: var(--text-tertiary); font-weight: 500; }
.info-value { font-size: 15px; font-weight: 600; color: var(--text-primary); }

.seller-card {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 20px; background: var(--bg-secondary);
  border-radius: var(--radius-lg); margin-bottom: 24px;
}
.seller-avatar { font-size: 28px; }
.seller-detail { display: flex; flex-direction: column; gap: 2px; }
.seller-name { font-size: 15px; font-weight: 600; color: var(--text-primary); }
.seller-meta { font-size: 13px; color: var(--text-tertiary); }

.detail-actions { display: flex; gap: 12px; }
.detail-actions .btn:first-child { flex: 2; }
.detail-actions .btn:nth-child(2) { flex: 1.5; }

.desc-section {
  background: var(--card-bg); border-radius: var(--radius-xl);
  padding: 32px; box-shadow: var(--card-shadow); border: 1px solid var(--border-light);
}
.block-title {
  font-size: 22px; font-weight: 700; color: var(--text-primary);
  margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--border);
}
.desc-text { font-size: 15px; line-height: 1.8; color: var(--text-secondary); }

.empty-state { text-align: center; padding: 120px 20px; }
.empty-icon { font-size: 56px; display: block; margin-bottom: 16px; }
.empty-state p { font-size: 16px; color: var(--text-secondary); margin-bottom: 20px; }

@media (max-width: 768px) {
  .detail-grid { grid-template-columns: 1fr; gap: 24px; }
  .detail-name { font-size: 24px; }
  .current-price { font-size: 28px; }
  .detail-actions { flex-wrap: wrap; }
  .detail-actions .btn { flex: 1; min-width: 120px; }
}
</style>
